import type { BusLocationForServer, LiveGeolocationSenderOptions } from '@/env'
import { WS_RESPONSE_TYPE } from '@/lib/constants'
import { trackLog } from '@/lib/utils'
import { useEffect, useRef, useState } from 'preact/hooks'
import { io, type Socket } from 'socket.io-client'
import { Temporal } from 'temporal-polyfill'

const INDICATORS = {
  TRACKING_LOADING: 'INDICATORS_TRACKING_LOADING',
  TRACKING_LOADED: 'INDICATORS_TRACKING_LOADED',
  TRACKING_FAILED: 'INDICATORS_TRACKING_FAILED',
  TRACKING_STOPPED: 'INDICATORS_TRACKING_STOPPED'
} as const

const SOCKET_EVENTS = {
  BUS_LOCATION: 'bus-location'
} as const

const DEFAULT_OPTIONS: LiveGeolocationSenderOptions = {
  id: null, // ID del chofer
  enableHighAccuracy: true,
  sendCoordinates: true,
  maximumAge: 0, // 0 para no usar posiciones cacheadas
  timeout: 10 * 1000 // Tiempo máximo para obtener la posición (en ms)
}

export function useLiveGeolocationSender (url: string, options: LiveGeolocationSenderOptions) {
  // Combinar opciones de configuración para garantizar inmutabilidad y valores por defecto
  const combinedOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  }
  
  // Referencias
  const socketRef = useRef<Socket | null>(null)
  const watchIdRef = useRef<number | null>(null)

  // Estados
  const [error, setError] = useState<[(Error | null), (string | null)]>([null, null])
  const [isWatching, setIsWatching] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  // indicatorTracking tiene como tipo null o "el valor de cualquier propiedad de INDICATORS"
  const [trackingIndicator, setTrackingIndicator] = useState<typeof INDICATORS[keyof typeof INDICATORS] | null>(null)
  const [position, setPosition] = useState<GeolocationPosition | null>(null)

  // Funciones para la conexión
  function startWatching () {
    if (isWatching) return
    
    // Indicador - Cargando seguimiento
    setTrackingIndicator(INDICATORS.TRACKING_LOADING)

    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
      enableHighAccuracy: combinedOptions.enableHighAccuracy,
      maximumAge: combinedOptions.maximumAge,
      timeout: combinedOptions.timeout
    })

    watchIdRef.current = watchId

    // Indicadores
    setIsWatching(true) // Consiguiendo ubicación continuamente
    setIsTracking(true) // Ubicando al usuario
  }

  function stopWatching () {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    // Indicadores - Terminar seguimiento
    setIsWatching(false)
    setIsTracking(false)
    setTrackingIndicator(INDICATORS.TRACKING_STOPPED)
  }

  function successCallback (position: GeolocationPosition) {
    if (!combinedOptions.id) {
      // Indicadores - Error, falta id
      setTrackingIndicator(INDICATORS.TRACKING_FAILED)
      setPosition(null)
      setError([null, 'Falta el ID del chofer'])
      return
    }
    
    // Indicadores - Todo correcto
    setTrackingIndicator(INDICATORS.TRACKING_LOADED) // Terminar carga de seguimiento al recibir la primera ubicación
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
    setError([error, 'Error consiguiendo la ubicación del usuario'])

    trackLog('WS', 'Error de ubicación', error, 'CHOFER', combinedOptions.id ?? undefined)
  }
  
  // Effect principal - Establecer conexión al servidor WebSocket
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
        id: combinedOptions.id
      }
    })

    socketRef.current = socket
    
    socket.on('connect', () => trackLog('WS', 'Chofer conectado', null, 'CHOFER', choferId))
    socket.on('disconnect', (reason) => trackLog('WS', 'Chofer desconectado', reason, 'CHOFER', choferId))
    socket.on('connection_error', (err) => setError([err, 'Error de conexión']))

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        trackLog('WS', 'Chofer desconectado', null, 'CHOFER', choferId)
      }
    }
  }, [combinedOptions.id, combinedOptions.sendCoordinates, url])

  return {
    startWatching,
    stopWatching,
    indicators: {
      trackingState: trackingIndicator,
      isTracking,
      isWatching
    },
    position,
    error
  }
}
