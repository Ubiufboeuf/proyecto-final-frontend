import type { BusesData, BusStates } from '@/env'
import { ENDPOINTS } from '@/lib/constants'
import { errorHandler } from '@/lib/utils'

export function getBaseBusesData (): BusesData {
  return {
    buses: null,
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

  let data
  try {
    const res = await fetch(ENDPOINTS.BUSES_DATA)
    data = await res.json()
  } catch (err) {
    errorHandler(err, 'Error consiguiendo la información')
  }

  // console.log('data', data)

  if (!data) return getBaseBusesData()
  
  const busesData: BusesData = {
    buses: data.buses,
    selectedCount: data.selectedCount,
    count: data.count || (data.buses ? data.buses.length + 1 : 0),
    delayed: data.delayed,
    inMovement: data.inMovement,
    inTerminal: data.inTerminal,
    timestamp: data.timestamp
  }

  const { buses } = busesData
  
  if (!buses) return busesData
  
  for (const busIdx in buses) {
    const bus = buses[busIdx]
    if (bus.state) {
      busStates[bus.state]++
    }
  }

  return busesData
}
