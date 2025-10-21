import type { BusesData } from '@/env'
import { Aside } from '@/components/tracking/Aside'
import { Header } from '@/components/tracking/Header'
import { MainZone } from '@/components/tracking/MainZone'
import { getBusesData } from '@/services/busService'
import { useEffect } from 'preact/hooks'
import { useBusesStore } from '@/stores/useBusesStore'
import { errorHandler } from '@/lib/utils'
import { useBusTrackingSocket } from '@/hooks/useBusTrackingSocket'
import { useTrackUIStore } from '@/stores/useTrackUIStore'

let wasOpen = false

export function Track ({ busesData, lat, lng }: { busesData: BusesData, lat: number, lng: number }) {
  const setBusesData = useBusesStore((state) => state.setBusesData)
  const isUIVisible = useTrackUIStore((state) => state.isUIVisible)

  useBusTrackingSocket()

  async function loadBusesData () {
    try {
      busesData = await getBusesData()
    } catch (err) {
      errorHandler(err, 'Error cargando los datos de los buses')
    }

    if (busesData) {
      setBusesData(busesData)
    }
  }

  function handleResize () {
    const drawerOverlay = document.querySelector('[data-vaul-overlay]')
    const drawerTrigger = document.querySelector('#trigger')

    if (!(drawerTrigger instanceof HTMLElement)) return
    
    const isOpen = drawerOverlay?.getAttribute('data-state') === 'open'

    if (window.outerWidth >= 1024 && isOpen) {
      drawerTrigger.click()
      wasOpen = true
    }
    
    if (window.outerWidth < 1024 && wasOpen) {
      drawerTrigger.click()
      wasOpen = false
    }
  }
  
  useEffect(() => {
    loadBusesData()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <>
      <Header />
      <Aside
        class='relative lg:left-0 -left-80 top-0 z-10 flex flex-col justify-between h-[calc(100%-64px)] max-h-[calc(100%-64px)] overflow-hidden w-80 border-r border-gray-200 bg-white [transition:left_250ms_ease] dark:bg-gray-800 dark:border-0'
        busesData={busesData}
        hidden={!isUIVisible}
      />
      <MainZone busesData={busesData} lat={Number(lat)} lng={Number(lng)} />
    </>
  )
}
