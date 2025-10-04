import type { LiveGeolocationSenderOptions } from '@/env'
import { trackLog } from '@/lib/utils'
import { useEffect, useRef, useState } from 'preact/hooks'
import { io, type Socket } from 'socket.io-client'

const DEFAULT_OPTIONS: LiveGeolocationSenderOptions = {
  id: null, // ID del chofer
  enableHighAccuracy: true,
  sendCoordinates: true,
  maximumAge: 0, // 0 para no usar posiciones cacheadas
  timeout: 10 * 1000 // Tiempo máximo para obtener la posición (en ms)
}

export function useLiveGeolocationSender (url: string, options: LiveGeolocationSenderOptions = DEFAULT_OPTIONS) {
  // Referencias
  const socketRef = useRef<Socket | null>(null)

  // Estados
  const [error, setError] = useState<[(Error | null), (string | null)]>([null, null])
  
  // Establecer conexión al servidor WebSocket
  useEffect(() => {
    const choferId = options.id
    if (!choferId || !options.sendCoordinates) return

    const socket = io(url, {
      // Forzar solo conexión websocket, sin usar http long polling por problemas en mi celular,
      // y si pasa incluso como fallback puede pasar en otros
      transports: ['websocket'],
      query: {
        // Mandar datos específicos para el handshake, no es necesario,
        // pero se usa para hacer más informativa la conexión inicial
        role: 'chofer',
        id: options.id
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
  }, [options.id, options.sendCoordinates, url])
}

// Esto es simplemente para no cambiar ahora la prueba de seguimiento, luego lo borro
export default useLiveGeolocationSender
