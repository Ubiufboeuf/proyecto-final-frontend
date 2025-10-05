import { useState, useEffect } from 'preact/compat'
import { useLiveGeolocationSender } from '@/hooks/useLiveGeolocationSender'
import { ENDPOINTS, INDICATORS } from '@/lib/constants'

// ID del bus controlado para test
const BUS_ID_TO_CONTROL = 'b123'

const userFriendlyConectionStates: Record<typeof INDICATORS.CONNECTION[keyof typeof INDICATORS.CONNECTION], string> = {
  [INDICATORS.CONNECTION.FAILED]: 'Seguimiento fallido',
  [INDICATORS.CONNECTION.ENTABLISHED]: 'Conexión establecida!',
  [INDICATORS.CONNECTION.LOADING]: 'Conectando...',
  [INDICATORS.CONNECTION.CLOSED]: 'Conexión cerrada'
}

const userFriendlyTrackingStates: Record<typeof INDICATORS.TRACKING[keyof typeof INDICATORS.TRACKING], string> = {
  [INDICATORS.TRACKING.FAILED]: 'Seguimiento fallido',
  [INDICATORS.TRACKING.LOADED]: 'Cargado!',
  [INDICATORS.TRACKING.LOADING]: 'Cargando...',
  [INDICATORS.TRACKING.STOPPED]: 'Seguimiento detenido',
  [INDICATORS.TRACKING.ID_MISSING]: 'Falta especificar un ID'
}

export function DriverDashboard () {
  const [serverUrl] = useState(ENDPOINTS.WS)
  const [highAccuracy, setHighAccuracy] = useState(true)

  const { error, indicators, position, startWatching, stopWatching } = useLiveGeolocationSender(serverUrl, {
    enableHighAccuracy: highAccuracy,
    id: BUS_ID_TO_CONTROL,
    maximumAge: 0, // Para no usar una ubicación cacheada,
    sendCoordinates: true,
    timeout: 10000
  })

  function toggleAccuracy () {
    setHighAccuracy((prevState) => !prevState)
  }

  return (
    <div>
      <h2>Panel de Chofer (Test)</h2>
      <p>Estado de la conexión: {indicators.connectionState ? userFriendlyConectionStates[indicators.connectionState] : 'unknown'}</p>
      <p>Estado del seguimiento: {indicators.trackingState ? userFriendlyTrackingStates[indicators.trackingState] : 'unknown'}</p>
      <p>Conectado: {indicators.isConnected ? 'si' : 'no'}</p>
      <p>Siguiendo: {indicators.isTracking ? 'si' : 'no'}</p>
      <p>Latitud: {position?.coords?.latitude ?? 'N/A'}</p>
      <p>Longitud: {position?.coords?.longitude ?? 'N/A'}</p>
      <p>Precisión: {highAccuracy ? 'Alta' : 'Normal'}</p>

      <button onClick={toggleAccuracy}>Cambiar precisión</button>
      
      <p>No confundas seguimiento con conexión</p>
      <button onClick={startWatching} disabled={indicators.isTracking || indicators.trackingState === INDICATORS.TRACKING.LOADING}>
        {indicators.trackingState === INDICATORS.TRACKING.LOADING ? 'Iniciando...' : 'Iniciar Seguimiento'}
      </button>
      <button onClick={stopWatching} disabled={!indicators.isTracking}>Detener Seguimiento</button>

      {error && <p>Error: {error}</p>}
    </div>
  )
}
