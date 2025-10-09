import { useEffect, useRef } from 'preact/hooks'
import { io, type Socket } from 'socket.io-client'
import type { BusLocationFromServer } from '@/env'
import { ENDPOINTS, WS_RESPONSE_TYPE } from '@/lib/constants'
import { errorHandler } from '@/lib/utils'
import { useBusesStore } from '@/stores/useBusesStore'

export function useBusTrackingSocket () {
  const socketRef = useRef<Socket | null>(null)
  const updateBusPosition = useBusesStore((state) => state.updateBusPosition)

  useEffect(() => {
    // Evitar crear conexión si ya existe
    if (socketRef.current) return

    let socket = null
    try {
      socket = io(ENDPOINTS.WS, { reconnectionAttempts: 3 })
      socketRef.current = socket
    } catch (err) {
      errorHandler(err)
      return
    }

    socket.on('connect', () => {
      console.log('Socket.IO conectado')
    })

    socket.on('disconnect', (reason) => {
      console.log('Socket.IO desconectado:', reason)
    })

    socket.on('connect_error', (err) => {
      errorHandler(err, 'Error de conexión Socket.IO')
    })

    socket.on('bus-location', (data) => {
      try {
        if (data.type === WS_RESPONSE_TYPE.BUS_POSITION) {
          const bus: BusLocationFromServer = data
          
          if (!bus.id || !bus.position) return

          updateBusPosition(bus.id, bus.position)
        }
      } catch (err) {
        errorHandler(err, 'Error procesando datos de bus-location')
      }
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        console.log('Socket.IO de seguimiento cerrado.')
      }
    }
  }, [updateBusPosition])
}
