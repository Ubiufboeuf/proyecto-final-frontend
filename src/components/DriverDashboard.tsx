import { useEffect, useState } from 'preact/compat'
import { useLiveGeolocationSender } from '@/hooks/useLiveGeolocationSender'
import { ENDPOINTS, INDICATORS, userFriendlyConectionStates, userFriendlyTrackingStates } from '@/lib/constants'
import type { User } from '@/env'
import { useBusesStore } from '@/stores/useBusesStore'

// ID del bus controlado para test
const BUS_ID_TO_CONTROL = 'b123'

export function DriverDashboard ({ user }: { user: User }) {
  const [serverUrl] = useState(ENDPOINTS.WS)
  const [highAccuracy, setHighAccuracy] = useState(true)
  const buses = useBusesStore((state) => state.buses)

  const { error, indicators, position, startTracking, stopTracking } = useLiveGeolocationSender(serverUrl, {
    enableHighAccuracy: highAccuracy,
    id: BUS_ID_TO_CONTROL,
    maximumAge: 0, // Para no usar una ubicación cacheada,
    sendCoordinates: true,
    timeout: 10000
  })

  function toggleAccuracy () {
    setHighAccuracy((prevState) => !prevState)
  }

  useEffect(() => {
    if (!buses) return

    const currentBus = buses.find((b) => b.driver.id === user.id)
  }, [buses])

  return (
    <>
      <section
        class='h-fit w-100 rounded-xl flex flex-col items-center gap-4 p-4 border border-gray-300 bg-white dark:border-0 dark:bg-gray-700/50'
      >
        <h1 class='text-gray-800 dark:text-gray-100 font-semibold text-lg'>Chofer: {fullName}</h1>
      </section>
      <div class='flex flex-col max-w-100'>
        
        <p>Estado de la conexión: {indicators.connectionState ? userFriendlyConectionStates[indicators.connectionState] : 'No conectado'}</p>
        <p>Estado del seguimiento: {indicators.trackingState ? userFriendlyTrackingStates[indicators.trackingState] : '-'}</p>
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
    </>
  )
}
