import type { Buses, BusStates } from '@/env'

const BUSES: Buses = {
  count: 12,
  inMovement: 0,
  selectedCount: 0,
  inTerminal: 0,
  delayed: 0,
  timestamp: 0,
  busesData: [
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

export async function getBuses () {
  const busStates: { [key in BusStates]: number } = { 'En terminal': 0, 'En viaje': 0, Atrasado: 0 }

  const buses: Buses = { ...BUSES }
  const data = buses.busesData
  for (const busIdx in data) {
    const bus = data[busIdx]
    if (bus.state) {
      busStates[bus.state]++
    }
  }
  return buses
}
