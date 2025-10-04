import type { BusLocationFromServer } from '@/env'
import { ENDPOINTS, WS_TYPE_BUS_POSITION } from '@/lib/constants'
import { errorHandler } from '@/lib/utils'
import { useBusesStore } from '@/stores/useBusesStore'
import { useEffect, useRef } from 'preact/hooks'

export function useBusTrackingSocket () {
  const wsRef = useRef<WebSocket | null>(null)
  const updateBusPosition = useBusesStore((state) => state.updateBusPosition)

  useEffect(() => {
    // Evitar crear conexion ws si ya existe
    if (wsRef.current) return
    
    const ws = new WebSocket(ENDPOINTS.WS)
    wsRef.current = ws

    ws.onopen = () => console.log('WebSocket abierto')

    ws.onmessage = (event) => {
      let data
      try {
        data = JSON.parse(event.data)
      } catch (err) {
        errorHandler(err, 'Error parseando los datos recibidos por WebSocket')
      }

      if (data.type === WS_TYPE_BUS_POSITION) {
        const bus: BusLocationFromServer = data

        if (!bus.id) return
        updateBusPosition(bus.id, bus.position)
      }
    }

    ws.onerror = (err) => {
      errorHandler(err, 'Error en WebSocket')
    }

    ws.onclose = (event) => {
      console.log('WebSocket cerrado:', event.code, event.reason)
    }

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close()
        console.log('WebSocket de seguimiento cerrado.')
      }
    }
  }, [updateBusPosition])  
}
