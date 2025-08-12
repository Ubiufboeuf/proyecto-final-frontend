import 'leaflet/dist/leaflet.css'
import type { BusStates } from '@/env'
import { useBusesStore } from '@/stores/useBusesStore'
import { useEffect, useRef, useState } from 'preact/hooks'
import type { Map } from 'leaflet'
import { Icon } from '../Icon'
import { IconWideArrowUp } from '../Icons'

export function MainZone () {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [state] = useState<BusStates>('En viaje')
  const updateBusState = useBusesStore((state) => state.updateBusState)
  const setDelayed = useBusesStore((state) => state.setDelayed)
  const setInMovement = useBusesStore((state) => state.setInMovement)
  const setInTerminal = useBusesStore((state) => state.setInTerminal)
  const busesData = useBusesStore((state) => state.busesData)
  
  async function loadMap () {
    let L
    try {
      L = await import('leaflet')
    } catch (err) {
      console.error('error importando leaflet:', err)
      return
    }

    const { tileLayer, map: createMap, control } = L

    let $map = map
    if (!$map) {
      $map = createMap('map', { zoomControl: false })
        .setView([lat || -34.4707, lng || -57.8515], 16) 
      setMap($map)
    control.zoom({ position: 'topright' }).addTo($map)
    }
    $map.locate({ setView: true, maxZoom: 16 })

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo($map)
  }

  useEffect(() => {
    if (map) return
    loadMap()
  }, [])

  useEffect(() => {
    const bus = busesData[0]
    updateBusState(bus.id, state)
  }, [state])

  useEffect(() => {
    const busStates: { [key in BusStates]: number } = { 'En terminal': 0, 'En viaje': 0, Atrasado: 0 }
    for (const bus of busesData) {
      if (!bus.state) continue
      busStates[bus.state]++
    }
    setDelayed(busStates.Atrasado)
    setInMovement(busStates['En viaje'])
    setInTerminal(busStates['En terminal'])
  }, [busesData])

  return (
    <main class='h-full w-full absolute right-0 top-0 z-0 pt-16 lg:pl-80 [transition:padding-left_ease_250ms]'>
      <div class='h-full w-full flex justify-center items-center'>
        <div
          ref={mapRef}
          id='map'
          class='w-full h-full max-w-full max-h-full overflow-hidden z-0'
        />
      </div>
      <button class='lg:hidden hover:bg-gray-100 touch:active:bg-gray-100 transition-colors cursor-pointer absolute bottom-6 left-1/2 [transform:translateX(-50%)] z-10 bg-white h-fit w-fit px-6 py-1 rounded-xl'>
        <Icon class='size-10'>
          <IconWideArrowUp />
        </Icon>
      </button>
    </main>
  )
}
