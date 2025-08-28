import type { BusesData } from '@/env'
import { Aside } from '@/components/tracking/Aside'
import { Header } from '@/components/tracking/Header'
import { MainZone } from '@/components/tracking/MainZone'
import { getBusesData } from '@/services/busService'
import { useEffect } from 'preact/hooks'
import { useBusesStore } from '@/stores/useBusesStore'
import { errorHandler } from '@/lib/utils'

export function Track ({ busesData, lat, lng }: { busesData: BusesData, lat: number, lng: number }) {
  const setBusesData = useBusesStore((state) => state.setBusesData)

  async function loadBusesData () {
    try {
      busesData = await getBusesData()
    } catch (err) {
      errorHandler('Error cargando los datos de los buses', err)
    }

    if (busesData) {
      setBusesData(busesData)
    }
  }
  
  useEffect(() => {
    loadBusesData()
  }, [])
  
  return (
    <>
      <Header busesData={busesData} />
      <Aside
        class='relative lg:left-0 -left-80 top-0 z-10 flex flex-col justify-between h-[calc(100%-64px)] max-h-[calc(100%-64px)] overflow-hidden w-80 border-r border-gray-200 bg-white [transition:left_250ms_ease]'
        busesData={busesData}
      
        />
      <MainZone busesData={busesData} lat={Number(lat)} lng={Number(lng)} />
    </>
  )
}
