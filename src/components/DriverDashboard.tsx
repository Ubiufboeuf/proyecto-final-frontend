import { useEffect, useState } from 'preact/compat'
import { useLiveGeolocationSender } from '@/hooks/useLiveGeolocationSender'
import { ENDPOINTS, userFriendlyConectionStates, userFriendlyTrackingStates } from '@/lib/constants'
import type { Bus, User } from '@/env'
import { useBusesStore } from '@/stores/useBusesStore'
import { MapLite } from './tracking/MapLite'

export function DriverDashboard ({ user }: { user: User }) {
  const [inDebugMode, setInDebugMode] = useState(false)
  
  const [serverUrl] = useState(ENDPOINTS.WS)
  const [highAccuracy, setHighAccuracy] = useState(true)

  const buses = useBusesStore((state) => state.buses)
  const [bus, setBus] = useState<Bus | null>(null)
  const [canUseTrackingButton, setCanUseTrackingButton] = useState(false)
  const [trackingButtonContent, setTrackingButtonContent] = useState('Iniciar seguimiento')

  const { error, indicators, position, startTracking, stopTracking } = useLiveGeolocationSender(serverUrl, {
    enableHighAccuracy: highAccuracy,
    id: bus?.id || null,
    maximumAge: 0, // Para no usar una ubicación cacheada,
    sendCoordinates: true,
    timeout: 10000
  })

  function toggleAccuracy () {
    setHighAccuracy((prevState) => !prevState)
  }

  function handleTracking () {
    if (!indicators.isConnected) {
      console.log('No conectado')
      return
    }

    const switchTracking = (indicators.isTracking) ? stopTracking : startTracking
    switchTracking()
  }

  function handleKeyDown (event: KeyboardEvent) {
    const { key, altKey } = event
    if (key === ' ' && altKey) {
      setInDebugMode((prevState) => !prevState)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.addEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    let newTrackingButtonContent = trackingButtonContent
    if (indicators.isTracking) newTrackingButtonContent = userFriendlyTrackingStates.INDICATORS_TRACKING_STOP
    if (!indicators.isTracking) newTrackingButtonContent = userFriendlyTrackingStates.INDICATORS_TRACKING_START

    setTrackingButtonContent(newTrackingButtonContent)
    setCanUseTrackingButton(indicators.isConnected)
  }, [indicators])

  useEffect(() => {
    if (!buses) return

    const currentBus = buses.find((b) => b.driver.id === user.id)
    if (!currentBus) return

    setBus(currentBus)
  }, [buses])

  return (
    <main class='flex flex-col gap-4 py-0 w-104 max-w-full not-dmc:px-0 mb-22.5'>
      <section
        class='h-fit w-full dmc:rounded-lg flex flex-col items-center gap-2 py-4 border border-gray-300 bg-white dark:border-0 dark:bg-gray-700/50'
      >
        <div class='text-gray-800 dark:text-gray-100 text-sm'>
          <span>{indicators.trackingState ? userFriendlyTrackingStates[indicators.trackingState] : '-'}</span>
          <span> | </span>
          <span>Búsqueda <strong>{highAccuracy ? 'PRECISA' : 'normal'}</strong></span>
        </div>
        <h1 class='flex items-center text-gray-800 dark:text-gray-100 font-semibold text-xl'>Bus -&nbsp;{ bus
          ? `${bus.id}`
          : (
            <div class='inline-flex h-6 w-16 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg loading'>
              <div />
            </div>
          )
        }</h1>
      </section>
      <section
        class='h-fit w-full dmc:rounded-lg flex flex-col gap-2 p-4 border border-gray-300 bg-white dark:border-0 dark:bg-gray-700/50'
        hidden={!inDebugMode}
      >
        <p>Estado de la conexión: {indicators.connectionState ? userFriendlyConectionStates[indicators.connectionState] : 'No conectado'}</p>
        <p>Estado del seguimiento: {indicators.trackingState ? userFriendlyTrackingStates[indicators.trackingState] : '-'}</p>
        <p>Coordenadas: {position?.coords.latitude ?? '-'} / {position?.coords.longitude ?? '-'}</p>
        <p>Precisión: {highAccuracy ? 'Alta' : 'Normal'}</p>

        {error?.[1] && <p>Error: {error[1]}</p>} {/* esto da error porque error puede ser objeto */}
      </section>
      <section class='h-80 w-full dmc:rounded-lg overflow-hidden bg-gray-700'>
        <MapLite coords={{ lat: position?.coords.latitude, lng: position?.coords.longitude }} />
      </section>
      <footer class='fixed bottom-0 z-[9999] h-fit w-full dmc:w-104 dmc:rounded-lg flex not-dmc:flex-wrap justify-center items-center gap-2 p-4 border border-gray-300 bg-white dark:border-0 dark:bg-[#242F3F]'>
        <button
          class='w-full dmc:w-fit text-nowrap rounded-lg p-2 px-4 hover:bg-orange-50 dark:hover:bg-gray-700 touch:active:bg-orange-50 dark:touch:active:bg-gray-700 text-orange-500 hover:text-gray-800 dark:hover:text-orange-50 dark:touch:active:text-orange-50 touch:active:text-gray-800 transition-colors border-orange-500 dark:hover:border-orange-50 dark:touch:active:border-orange-50 border cursor-pointer'
          onClick={toggleAccuracy}
        >
          Cambiar precisión
        </button>
        <button
          class='w-full text-nowrap rounded-lg p-2 px-4 border transition-colors cursor-pointer
          
          text-white not-disabled:bg-orange-500 not-disabled:border-orange-500 not-disabled:hover:bg-orange-600 not-disabled:hover:border-orange-600 not-disabled:touch:active:bg-orange-600 not-disabled:touch:active:border-orange-600

          not-disabled:dark:bg-orange-600 not-disabled:dark:border-orange-600 not-disabled:dark:hover:bg-orange-600/80 not-disabled:dark:hover:border-orange-[#CA430B] not-disabled:dark:touch:active:bg-orange-600/80 not-disabled:dark:touch:active:border-[#CA430B]
          
          disabled:cursor-not-allowed disabled:bg-gray-700 disabled:border-gray-700
          '
          onClick={handleTracking}
          disabled={!canUseTrackingButton}
        >
          {trackingButtonContent}
        </button>
      </footer>
    </main>
  )
}
