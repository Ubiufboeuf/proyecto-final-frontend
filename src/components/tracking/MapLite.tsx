import 'leaflet/dist/leaflet.css'
import type { Coords } from '@/env'
import { useEffect, useRef, useState } from 'preact/hooks'
import type { Map } from 'leaflet'

const DEFAULT_LAT = -34.4707
const DEFAULT_LNG = -57.8515
const DEFAULT_ZOOM = 16

export function MapLite ({ coords }: { coords: Partial<Coords> }) {
  const lat = coords.lat || DEFAULT_LAT
  const lng = coords.lng || DEFAULT_LNG

  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const [leaflet, setLeaflet] = useState<typeof import('/home/mango/proyecto-final/frontend/node_modules/.pnpm/@types+leaflet@1.9.20/node_modules/@types/leaflet/index')>()
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)

  async function importLeaflet () {
    let L
    try {
      L = await import('leaflet')
    } catch (err) {
      console.error('error importando leaflet:', err)
      return
    }

    setLeaflet(L)
  }
  
  async function loadMap () {
    if (!leaflet) return

    const { tileLayer, map: createMap, control } = leaflet

    let $map = map
    if (!$map) {
      $map = createMap('map', { zoomControl: false })
        .setView([lat || DEFAULT_LAT, lng || DEFAULT_LNG], DEFAULT_ZOOM)
      setMap($map)
      control.zoom({ position: 'topright' }).addTo($map)
    }

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'    
    }).addTo($map)
  }

  useEffect(() => {
    if (map) return

    importLeaflet()
  }, [])

  useEffect(() => {
    if (!leaflet) return

    loadMap()  
  }, [leaflet])

  return (
    <main
      ref={mapRef}
      id='map'
      class='relative z-0 w-full h-full max-w-full max-h-full overflow-hidden'
    />
  )
}
