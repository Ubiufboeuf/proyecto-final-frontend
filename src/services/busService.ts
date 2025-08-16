import type { BusesData, BusStates } from '@/env'

export function getBaseBusesData (): BusesData {
  return {
    buses: [],
    selectedCount: 0,
    count: 0,
    delayed: 0,
    inMovement: 0,
    inTerminal: 0,
    timestamp: 0
  }
}

export async function getBusesData () {
  const busStates: { [key in BusStates]: number } = { 'En terminal': 0, 'En viaje': 0, Atrasado: 0 }

  const busesData: BusesData = getBaseBusesData()
  const { buses } = busesData
  for (const busIdx in buses) {
    const bus = buses[busIdx]
    if (bus.state) {
      busStates[bus.state]++
    }
  }
  return busesData
}
