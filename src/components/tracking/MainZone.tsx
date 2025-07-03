import type { BusStates } from '@/env'
import { useBusesStore } from '@/stores/useBusesStore'
import { useEffect, useState } from 'preact/hooks'

export function MainZone () {
  const [state, setState] = useState<BusStates>('En viaje')
  const updateBusState = useBusesStore((state) => state.updateBusState)
  const setDelayed = useBusesStore((state) => state.setDelayed)
  const setInMovement = useBusesStore((state) => state.setInMovement)
  const setInTerminal = useBusesStore((state) => state.setInTerminal)
  const busesData = useBusesStore((state) => state.busesData)
  
  function change () {
    if (state === 'En viaje') {
      setState('En terminal')
    } else if (state === 'En terminal') {
      setState('Atrasado')
    } else {
      setState('En viaje')
    }
  }

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
    <main class='h-full w-full absolute left-0 top-0 z-0 pt-16 pl-80'>
      <div class='h-full w-full flex justify-center items-center'>
        <button onClick={change}>Cambiar primer bus entre estados</button>
      </div>
    </main>
  )
}
