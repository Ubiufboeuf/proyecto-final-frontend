import { useEffect, useRef, useState } from 'preact/hooks'
import { io, type Socket } from 'socket.io-client'
import type { BusLocationFromServer, Point } from '@/env'
import { ENDPOINTS, WS_RESPONSE_TYPE } from '@/lib/constants'
import { errorHandler } from '@/lib/utils'
import { useBusesStore } from '@/stores/useBusesStore'

export function useBusTrackingSocket () {
  const socketRef = useRef<Socket | null>(null)
  const updateBusPosition = useBusesStore((state) => state.updateBusPosition)
  const selectedBuses = useBusesStore((state) => state.selectedBuses)
  const [lastPositions, setLastPositions] = useState<Record<string, Point>>({})

  useEffect(() => {
    // Evitar crear conexión si ya existe
    if (socketRef.current || !ENDPOINTS.WS) return

    let socket = null
    try {
      socket = io(ENDPOINTS.WS, { reconnectionAttempts: 3,  extraHeaders: {'ngrok-skip-browser-warning': 'any-value'} })
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
      errorHandler(err, 'Error de conexión Socket.IO', true)
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

    socket.on('response-last-position', ({ id, latlng }) => {
      // console.log('response last position', id, latlng)
      if (!latlng) return

      updateBusPosition(id, latlng)
      setLastPositions((p) => ({
        ...p,
        [id]: latlng
      }))
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        console.log('Socket.IO de seguimiento cerrado.')
      }
    }
  }, [updateBusPosition])

  useEffect(() => {
    const socket = socketRef.current
    if (!socket) return
    
    // console.log(lastPositions)
    for (const { id } of selectedBuses) {
      if (lastPositions[id]) continue

      socket.emit('request-last-position', id)
    }
  }, [selectedBuses, lastPositions])
}
