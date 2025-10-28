import 'leaflet/dist/leaflet.css'
import type { BusesData, BusStates } from '@/env'
import { useBusesStore } from '@/stores/useBusesStore'
import { useEffect, useRef, useState } from 'preact/hooks'
import type { LatLngTuple, Map, Marker } from 'leaflet'
import VaulDrawer from './Drawer'
import { Icon } from '../Icon'
import { IconEye, IconEyeClosed, IconFocus } from '../Icons'
import { useTrackUIStore } from '@/stores/useTrackUIStore'
import { errorHandler } from '@/lib/utils'

const DEFAULT_LAT = -34.4707
const DEFAULT_LNG = -57.8515
const DEFAULT_ZOOM = 16

export function MainZone ({ busesData, lat = 0, lng = 0 }: { busesData: BusesData, lat: number, lng: number }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const myMarkerRef = useRef<Marker>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [state] = useState<BusStates>('En viaje')
  const updateBusState = useBusesStore((state) => state.updateBusState)
  const setDelayed = useBusesStore((state) => state.setDelayed)
  const setInMovement = useBusesStore((state) => state.setInMovement)
  const setInTerminal = useBusesStore((state) => state.setInTerminal)
  const buses = useBusesStore((state) => state.buses)
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const [leaflet, setLeaflet] = useState<typeof import('/home/mango/proyecto-final/frontend/node_modules/.pnpm/@types+leaflet@1.9.20/node_modules/@types/leaflet/index')>()
  // const [isUIVisible, setIsUIVisible] = useState(true)
  const isUIVisible = useTrackUIStore((state) => state.isUIVisible)
  const setIsUIVisible = useTrackUIStore((state) => state.setIsUIVisible)

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

    // $map.locate({ setView: true, maxZoom: 16 })

    $map.on('moveend', () => {
      const { origin } = location
      const { lat, lng } = $map.getCenter()

      const newState = { page: '/track/' }
      const newUrl = `${origin}/track/${lat.toFixed(6)}/${lng.toFixed(6)}/`
      history.replaceState(newState, '', newUrl)
    })

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'    
    }).addTo($map)
  }

  function handleToggleUI () {
    setIsUIVisible(!isUIVisible)
    const resizeEvent = new UIEvent('resize')
    window.dispatchEvent(resizeEvent)
  }

  function handleLocateMe () {
    // console.log(map)
    const marker = leaflet?.marker
    const icon = leaflet?.icon

    if (!map || !marker || !icon) return

    const myMarker = myMarkerRef.current
    const markerIcon = icon({
      iconUrl: '/marker-icon.png',
      iconSize: [25, 41]
    })

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const latlng: [number, number] = [
        coords.latitude,
        coords.longitude
      ]
      map.setView(latlng, map.getZoom())
      if (!myMarker) {
        myMarkerRef.current = marker(latlng, { icon: markerIcon }).addTo(map)
      } else {
        myMarker.setLatLng(latlng)
      }
    }, (err) => errorHandler(err, 'Error consiguiendo la posición del usuario'), {
      enableHighAccuracy: true,
      maximumAge: 0
    })

    map.once('locationerror', (err) => {
      alert(`Error obteniendo ubicación: ${err.message}`)
    })
  }

  async function handleBusesAndRoutes () {
    if (!leaflet || !buses) return

    const { map: createMap, control, marker, polyline, icon } = leaflet

    let $map = map
    if (!$map) {
      $map = createMap('map', { zoomControl: false })
        .setView([lat || DEFAULT_LAT, lng || DEFAULT_LNG], DEFAULT_ZOOM)
      setMap($map)
      control.zoom({ position: 'topright' }).addTo($map)
    }

    const markerIcon = icon({
      iconUrl: '/marker-icon.png',
      iconSize: [25, 41]
    })

    for (const { location, route } of buses) {
      if (location.position !== null) {
        const { x, y } = location.position

        // Marcador
        let busMarker = location.marker

        if (!busMarker) {
          busMarker = marker({ lat: y, lng: x }, { icon: markerIcon }).addTo($map)
          location.marker = busMarker
        }

        busMarker.setLatLng({ lat: y, lng: x })
      }
      
      // Ruta planeada
      const busPlannedRoute: LatLngTuple[] = []

      for (const point of route.planned) {
        if (!point) continue
        busPlannedRoute.push([point.y, point.x])
      }

      let busPlannedPolyline = route.planned_polyline
      
      if (!busPlannedPolyline) {
        busPlannedPolyline = polyline(busPlannedRoute, {
          color: 'blue',
          weight: 4,
          opacity: 0.8
        }).addTo($map)
      }

      // Ruta actual
      const busCurrentRoute: LatLngTuple[] = []

      for (const point of route.current) {
        if (!point) continue
        busCurrentRoute.push([point.y, point.x])
      }

      let busCurrentPolyline = route.current_polyline
      
      if (!busCurrentPolyline) {
        busCurrentPolyline = polyline(busCurrentRoute, {
          color: 'blue',
          weight: 4,
          opacity: 0.8
        }).addTo($map)
      }
    }
  }

  useEffect(() => {
    if (map) return

    importLeaflet()
  }, [])

  useEffect(() => {
    if (!leaflet) return

    loadMap()  
  }, [leaflet])

  useEffect(() => {
    const bus = buses?.[0]
    if (bus?.id) {
      updateBusState(bus.id, state)
    }
  }, [state])

  useEffect(() => {
    if (!buses) return

    const busStates: { [key in BusStates]: number } = { 'En terminal': 0, 'En viaje': 0, Atrasado: 0 }
    for (const bus of buses) {
      if (!bus.state) continue
      busStates[bus.state]++
    }
    setDelayed(busStates.Atrasado)
    setInMovement(busStates['En viaje'])
    setInTerminal(busStates['En terminal'])

    handleBusesAndRoutes()
  }, [buses])

  return (
    <main class={`${isUIVisible ? 'isUIVisible' : ''} [&.isUIVisible]:pt-16 [&.isUIVisible]:lg:pl-80 h-full w-full absolute right-0 top-0 z-0`}>
      <div class='h-full w-full flex justify-center items-center relative'>
        <div
          ref={mapRef}
          id='map'
          class='w-full h-full max-w-full max-h-full overflow-hidden z-0'
        />
        <header class='flex items-center gap-2 h-fit w-fit absolute left-2.5 top-2.5 rounded-lg px-4 py-3 mr-14
        bg-white dark:bg-gray-800'>
          <button class='flex items-center justify-center gap-2 w-fit h-fit max-w-full max-h-full px-3 p-2 border-2 text-sm cursor-pointer transition-colors rounded-lg outline-0
            text-gray-800 border-gray-200 hover:bg-orange-50 active:bg-orange-50 touch:active:bg-orange-50 hover:border-orange-500/50 active:border-orange-500/50 touch:active:border-orange-500/50 focus-visible:bg-gray-100 focus-visible:border-orange-500/50
            dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:touch:active:bg-gray-700 dark:hover:border-gray-600 dark:active:border-gray-600 dark:touch:active:border-gray-600 dark:focus-visible:bg-gray-600'
            onClick={handleLocateMe}
          >
            <Icon class='size-5'>
              <IconFocus />
            </Icon>
            <span class='hidden us:inline' hidden={!isUIVisible}>Ubícame</span>
          </button>
          <button
            class='flex items-center justify-center gap-2 w-fit h-fit max-w-full max-h-full px-3 p-2 border-2 text-sm cursor-pointer transition-colors rounded-lg outline-0
          text-gray-800 border-gray-200 hover:bg-orange-50 active:bg-orange-50 touch:active:bg-orange-50 hover:border-orange-500/50 active:border-orange-500/50 touch:active:border-orange-500/50 focus-visible:bg-gray-100 focus-visible:border-orange-500/50
          dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:touch:active:bg-gray-700 dark:hover:border-gray-600 dark:active:border-gray-600 dark:touch:active:border-gray-600 dark:focus-visible:bg-gray-600'
            onClick={handleToggleUI}
          >
            <Icon class='size-5' hidden={isUIVisible}>
              <IconEye />
            </Icon>
            <Icon class='size-5' hidden={!isUIVisible}>
              <IconEyeClosed />
            </Icon>
            <span class='hidden us:inline' hidden={!isUIVisible}>{isUIVisible ? 'Ocultar interfaz' : 'Mostrar interfaz'}</span>
          </button>
        </header>
        <VaulDrawer busesData={busesData} />
      </div>
    </main>
  )
}
