import type { BusesData, BusStates } from '@/env'

const BUSES_DATA: BusesData = {
  count: 12,
  inMovement: 0,
  selectedCount: 0,
  inTerminal: 0,
  delayed: 0,
  timestamp: 0,
  buses: [
    {
      id: 'b123',
      state: 'En terminal',
      driver: {
        id: 'd123',
        name: 'Bob Johnson'
      },
      destination: {
        location: 'Punta del Este',
        timestamp: 0
      },
      location: 'Canelones',
      origin: {
        location: 'Montevideo',
        timestamp: 0
      },
      passengers: {
        capacity: 48,
        onBoard: 24
      },
      progress: 65,
      selected: false
    },
    {
      id: 'b234',
      state: 'En terminal',
      driver: {
        id: 'd123',
        name: 'Bob Johnson'
      },
      destination: {
        location: 'Punta del Este',
        timestamp: 0
      },
      location: 'Canelones',
      origin: {
        location: 'Montevideo',
        timestamp: 0
      },
      passengers: {
        capacity: 48,
        onBoard: 24
      },
      progress: 65,
      selected: false
    },
    {
      id: 'b345',
      state: 'En terminal',
      driver: {
        id: 'd123',
        name: 'Bob Johnson'
      },
      destination: {
        location: 'Punta del Este',
        timestamp: 0
      },
      location: 'Canelones',
      origin: {
        location: 'Montevideo',
        timestamp: 0
      },
      passengers: {
        capacity: 48,
        onBoard: 24
      },
      progress: 65,
      selected: false
    },
    {
      id: 'b456',
      state: 'En terminal',
      driver: {
        id: 'd123',
        name: 'Bob Johnson'
      },
      destination: {
        location: 'Punta del Este',
        timestamp: 0
      },
      location: 'Canelones',
      origin: {
        location: 'Montevideo',
        timestamp: 0
      },
      passengers: {
        capacity: 48,
        onBoard: 24
      },
      progress: 65,
      selected: false
    }
  ]
}

export async function getBusesData () {
  const busStates: { [key in BusStates]: number } = { 'En terminal': 0, 'En viaje': 0, Atrasado: 0 }

  const busesData: BusesData = { ...BUSES_DATA }
  const { buses } = busesData
  for (const busIdx in buses) {
    const bus = buses[busIdx]
    if (bus.state) {
      busStates[bus.state]++
    }
  }
  return busesData
}
