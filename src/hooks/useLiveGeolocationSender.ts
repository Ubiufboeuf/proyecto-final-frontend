import type { BusLocationForServer, LiveGeolocationSenderOptions } from '@/env'
import { INDICATORS, SOCKET_EVENTS, WS_RESPONSE_TYPE } from '@/lib/constants'
import { getMessageByList, trackLog } from '@/lib/utils'
import { useEffect, useRef, useState } from 'preact/hooks'
import { io, type Socket } from 'socket.io-client'
import { Temporal } from 'temporal-polyfill'

const DEFAULT_OPTIONS: LiveGeolocationSenderOptions = {
  id: null, // ID del chofer
  enableHighAccuracy: true,
  sendCoordinates: true,
  maximumAge: 0, // 0 para no usar posiciones cacheadas
  timeout: 10 * 1000 // Tiempo máximo para obtener la posición (en ms)
}

export function useLiveGeolocationSender (url: string, options: LiveGeolocationSenderOptions) {
  // #region --- Variables, estados y referencias ---

  // Combinar opciones de configuración para garantizar inmutabilidad y valores por defecto
  const combinedOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  }
  
  // Referencias
  const socketRef = useRef<Socket | null>(null)
  const trackIdRef = useRef<number | null>(null)

  // Estados
  const [error, setError] = useState<[(Error | null), (string | null)]>([null, null])
  const [position, setPosition] = useState<GeolocationPosition | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  
  // Los indicadores tienen como valor "null" o "el valor de cualquier propiedad de su indicador en INDICATORS"
  const [connectionIndicator, setConnectionIndicator] = useState<typeof INDICATORS.CONNECTION[keyof typeof INDICATORS.CONNECTION] | null>(null)
  const [trackingIndicator, setTrackingIndicator] = useState<typeof INDICATORS.TRACKING[keyof typeof INDICATORS.TRACKING] | null>(null)
  
  // #endregion --- Variables, estados y referencias ---

  // #region --- Funciones de la conexión ---

  function handleSocketConnected (choferId: string) {
    trackLog('WS', 'Conexión establecida', null, 'CHOFER', choferId)

    // Conexión establecida
    setError([null, null])
    setIsConnected(true)
    setConnectionIndicator(INDICATORS.CONNECTION.ENTABLISHED)
  }

  function handleSocketDisconnected (choferId: string, reason: Socket.DisconnectReason) {
    trackLog('WS', 'Conexión cerrada', reason, 'CHOFER', choferId)

    // Conexión cerrada
    setError([null, null])
    setIsConnected(false)
    setConnectionIndicator(INDICATORS.CONNECTION.CLOSED)
    setIsTracking(false)
    setTrackingIndicator(INDICATORS.TRACKING.STOPPED)
  }

  function handleConnectionError (choferId: string, err: unknown) {
    let error = null
    if (err instanceof Error) {
      error = err
    } else if (typeof err === 'string') {
      error = new Error(err)
    } else {
      error = new Error('Tipo de error desconocido', { cause: err })
    }

    trackLog('WS', 'Error de conexión', error, 'CHOFER', choferId)
    
    // Error de conexión
    setError([error, 'Error de conexión'])
    setIsConnected(false)
    setConnectionIndicator(INDICATORS.CONNECTION.FAILED)
    setIsTracking(false)
    setTrackingIndicator(INDICATORS.TRACKING.FAILED)
  }
  
  // #endregion --- Funciones de la conexión ---

  // #region --- Funciones del seguimiento ---

  function startTracking () {
    if (isTracking) return
    
    // Cargando seguimiento
    setTrackingIndicator(INDICATORS.TRACKING.LOADING)

    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
      enableHighAccuracy: combinedOptions.enableHighAccuracy,
      maximumAge: combinedOptions.maximumAge,
      timeout: combinedOptions.timeout
    })

    trackIdRef.current = watchId

    // Siguiendo al usuario
    setIsTracking(true)
  }

  function stopTracking () {
    if (trackIdRef.current !== null) {
      navigator.geolocation.clearWatch(trackIdRef.current)
      trackIdRef.current = null
    }

    // Terminar seguimiento
    setIsTracking(false)
    setTrackingIndicator(INDICATORS.TRACKING.STOPPED)
  }

  function successCallback (position: GeolocationPosition) {
    if (!combinedOptions.id) {
      // Error, falta ID
      setIsTracking(false)
      setTrackingIndicator(INDICATORS.TRACKING.ID_MISSING)
      setPosition(null)
      setError([null, 'Falta el ID del chofer'])
      return
    }
    
    // Todo correcto
    setTrackingIndicator(INDICATORS.TRACKING.LOADED) // Terminar carga de seguimiento al recibir la primera ubicación
    setPosition(position) // Guardar coordenadas
    setError([null, null]) // Limpiar último mensaje de error

    // Enviar datos al servidor
    const socket = socketRef.current
    if (socket && socket.connected) {
      const { coords } = position

      const busLocation: BusLocationForServer = {
        id: combinedOptions.id,
        accuracy: coords.accuracy,
        appTimestamp: Temporal.Now.instant().epochMilliseconds,
        gpsTimestamp: position.timestamp,
        position: {
          x: coords.longitude,
          y: coords.latitude
        },
        speed: coords.speed,
        type: WS_RESPONSE_TYPE.BUS_POSITION
      }

      socket.emit(SOCKET_EVENTS.BUS_LOCATION, busLocation)
    }
  }

  function errorCallback (positionError: GeolocationPositionError) {
    const { code, message } = positionError
    let cause = `Código de error desconocido: ${code}`

    if (code === positionError.PERMISSION_DENIED) {
      cause = 'Permiso denegado por el usuario'
    } else if (code === positionError.POSITION_UNAVAILABLE) {
      cause = 'Ubicación no disponible'
    } else if (code === positionError.TIMEOUT) {
      cause = 'Tiempo de espera agotado'
    }

    const error = new Error(message, { cause })
    const { extraMessage: logMessage } = trackLog('WS', 'Error de ubicación', error, 'CHOFER', combinedOptions.id ?? undefined)

    // Indicadores - Error al conseguir la posicón
    const msg = getMessageByList(logMessage)
    setError([error, msg])
    setIsTracking(false)
    setTrackingIndicator(INDICATORS.TRACKING.FAILED)
  }

  // #endregion --- Funciones del seguimiento ---
  
  // Effect principal - Establecer conexión con el servidor WebSocket
  useEffect(() => {
    const choferId = combinedOptions.id
    if (!choferId || !combinedOptions.sendCoordinates) return

    const socket = io(url, {
      // Forzar solo conexión websocket, sin usar http long polling por problemas en mi celular,
      // y si pasa incluso como fallback puede pasar en otros
      transports: ['websocket'],
      query: {
        // Mandar datos específicos para el handshake, no es necesario,
        // pero se usa para hacer más informativa la conexión inicial
        role: 'chofer',
        id: choferId
      },
      extraHeaders: {'ngrok-skip-browser-warning': 'any-value'},
      reconnectionAttempts: 3
    })

    socketRef.current = socket
    
    socket.on('connect', () => handleSocketConnected(choferId))
    socket.on('disconnect', (reason) => handleSocketDisconnected(choferId, reason))
    socket.on('connection_error', (err) => handleConnectionError(choferId, err))

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [combinedOptions.id, combinedOptions.sendCoordinates, url])

  return {
    startTracking,
    stopTracking,
    indicators: {
      isConnected,
      isTracking,
      connectionState: connectionIndicator,
      trackingState: trackingIndicator
    },
    position,
    error
  }
}
