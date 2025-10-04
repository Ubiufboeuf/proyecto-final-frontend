import { useState, useEffect } from 'preact/compat'
import { useLiveGeolocationSender } from '@/hooks/useLiveGeolocationSender'

// ID del bus controlado para test
const BUS_ID_TO_CONTROL = 'b123'

export function DriverDashboard() {
  const [serverUrl] = useState('http://192.168.1.5:8080')
  const [highAccuracy, setHighAccuracy] = useState(true)

  const {
    coordinates,
    isTracking,
    isLoadingTracking,
    error,
    isWatching,
    startWatching,
    stopWatching
  } = useLiveGeolocationSender(serverUrl, {
    enableHighAccuracy: highAccuracy,
    timeout: 10000,
    maximumAge: 30000,
    sendCoordinates: true,
    busId: BUS_ID_TO_CONTROL
  })

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')

  useEffect(() => {
    if (isWatching && !error) setConnectionStatus('connected')
    else if (isTracking) setConnectionStatus('connecting')
    else setConnectionStatus('disconnected')
  }, [isWatching, isTracking, error])

  return (
    <div>
      <h2>Panel de Chofer (Test)</h2>
      <p>Estado: {connectionStatus}</p>
      <p>Latitud: {coordinates?.latitude ?? 'N/A'}</p>
      <p>Longitud: {coordinates?.longitude ?? 'N/A'}</p>

      <button onClick={startWatching} disabled={isWatching || isLoadingTracking}>
        {isLoadingTracking ? 'Iniciando...' : 'Iniciar Seguimiento'}
      </button>
      <button onClick={stopWatching} disabled={!isWatching}>Detener Seguimiento</button>
      {error && <p>Error: {error}</p>}
    </div>
  )
}
