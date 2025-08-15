import 'leaflet/dist/leaflet.css'
import type { Buses, BusStates } from '@/env'
import { useBusesStore } from '@/stores/useBusesStore'
import { useEffect, useRef, useState } from 'preact/hooks'
import type { Map } from 'leaflet'
import VaulDrawer from './Drawer'
import { Icon } from '../Icon'
import { IconEye, IconFocus } from '../Icons'

export function MainZone ({ buses, lat = 0, lng = 0 }: { buses: Buses, lat: number, lng: number }) {
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

    // $map.locate({ setView: true, maxZoom: 16 })

    $map.on('moveend', () => {
      const { origin } = location
      const { lat, lng } = $map.getCenter()

      const newState = { page: '/track/' }
      const newUrl = `${origin}/track/${lat.toFixed(6)}/${lng.toFixed(6)}/`
      history.pushState(newState, '', newUrl)
    })

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'    
    }).addTo($map)
  }

  function handleLocateMe () {
    console.log(map)
    if (!map) return

    map.locate({ setView: false })
    map.once('locationfound', (e) => {
      map.setView(e.latlng, map.getZoom())
    })
    map.once('locationerror', (err) => {
      alert(`Error obteniendo ubicación: ${err.message}`)
    })
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
      <div class='h-full w-full flex justify-center items-center relative'>
        <div
          ref={mapRef}
          id='map'
          class='w-full h-full max-w-full max-h-full overflow-hidden z-0'
        />
        <header class='w-fit absolute left-2.5 top-2.5 bg-white rounded-lg px-4 py-3 flex items-center gap-2 h-fit [&>button]:flex [&>button]:items-center [&>button]:max-h-full [&>button]:w-fit [&>button]:p-2 [&>button]:px-3 [&>button]:border [&>button]:border-gray-300 [&>button]:rounded-lg [&>button]:gap-2 [&>button]:text-gray-800 [&>button]:cursor-pointer [&>button]:text-sm [&>button]:hover:bg-gray-200 [&>button]:transition-colors'>
          <button>
            <Icon class='size-5'>
              <IconEye />
            </Icon>
            <span>Vista Satélite</span>
          </button>
          <button onClick={handleLocateMe}>
            <Icon class='size-5'>
              <IconFocus />
            </Icon>
            <span>Ubícame</span>
          </button>
        </header>
        <VaulDrawer buses={buses} />
      </div>
    </main>
  )
}
