import { useEffect, useState, type ChangeEvent } from 'react'
import type { Route } from './+types/home'
import useLiveGeolocationSender from '~/hooks/useLiveGeolocationSender'
import { parseTimestamp } from '~/lib/utils'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: title('Inicio') },
    { name: 'description', content: 'Web no oficial de berruti. Proyecto de secundaria' }
  ]
}

export default function Home () {
  const [isSendingCoordinates, setIsSendingCoordinates] = useState<boolean>(false)
  const [isGPSMode, setIsGPSMode] = useState<boolean>(false)
  const { coordinates: coords, error, isWatching, loading, startWatching, stopWatching } = useLiveGeolocationSender('https://56f8-190-64-207-178.ngrok-free.app', {
    enableHighAccuracy: isGPSMode,
    timeout: 15000,
    sendCoordinates: isSendingCoordinates
  })

  useEffect(() => {
    if (isSendingCoordinates && !isWatching) {
      startWatching()
    } else if (!isSendingCoordinates && isWatching) {
      stopWatching()
    }
  }, [isWatching, isSendingCoordinates])

  function toggleSendCoordinates (event: ChangeEvent<HTMLInputElement>) {
    const newState = event.currentTarget.checked
    setIsSendingCoordinates(newState)
  }
  
  function toggleGPSMode (event: ChangeEvent<HTMLInputElement>) {
    const newState = event.currentTarget.checked
    setIsGPSMode(newState)
  }

  return (
    <div className='flex flex-col p-4'>
      <header className='border-b-2 flex gap-2 pb-2 border-neutral-700 items-center'>
        <label className='w-fit p-2 px-3 flex gap-2 has-checked:bg-neutral-700 hover:bg-neutral-800 bg-transparent rounded-lg transition-colors select-none cursor-pointer'>
          Envíar coordenadas
          <input type='checkbox' onInput={toggleSendCoordinates} hidden />
        </label>

        <label className='w-fit p-2 px-3 flex gap-2 has-checked:bg-neutral-700 hover:bg-neutral-800 bg-transparent rounded-lg transition-colors select-none cursor-pointer'>
          Modo GPS
          <input type='checkbox' onInput={toggleGPSMode} hidden />
        </label>
      </header>
      <main className='p-2 px-3 flex flex-col gap-4'>
        <div>
          <strong>Información</strong>
          <p>Latitud: {coords?.latitude ?? 0}</p>
          <p>Longitud: {coords?.longitude ?? 0}</p>
          <p>Precisión: {coords?.altitudeAccuracy ?? 0} metros</p>
          <p>Altitud: {coords?.altitude ?? 0} metros</p>
          <p>Velocidad: {coords?.speed ?? 0}m/s</p>
          <p>Orientación: {coords?.heading ?? '-'} grados</p>
          <p>Timestamp: {coords?.timestamp ? parseTimestamp(coords.timestamp) : '-'}</p>
        </div>
        <div>
          <strong>Extra</strong>
          <p>Error: {error}</p>
          <p>Observando coordenadas: {isWatching ? 'si' : 'no'}</p>
          <p>{loading ? 'Cargando...' : '¡Carga completa!'}</p>
        </div>
      </main>
    </div>
  )
}
