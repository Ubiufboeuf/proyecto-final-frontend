import type { BusData, Buses, BusStates } from '@/env'
import { create } from 'zustand'
import { getBuses } from '@/services/busService'

const buses = await getBuses()

interface BusesStore extends Buses {
  setCount: (newValue: number) => void
  setInMovement: (newValue: number) => void
  setInTerminal: (newValue: number) => void
  setDelayed: (newValue: number) => void
  setSelectedCount: (newValue: number) => void
  setTimestamp: (newValue: number) => void
  setData: (newValue: Array<BusData>) => void
  updateBusData: (newBusData: BusData) => BusData[]
  addBusData: (newBus: BusData) => BusData[]
  removeBusData: (busId: string) => BusData[]
  updateBusState: (busId: string, newState: BusStates) => void
  /* count: 12,
  inMovement: 5,
  selected: 0,
  inTerminal: 0,
  delayed: 4,
  timestamp: 0, */
}

export const useBusesStore = create<BusesStore>((set, get) => ({
  ...buses,
  setCount: (newValue) => set({ count: newValue }),
  setInMovement: (newValue) => set({ inMovement: newValue }),
  setInTerminal: (newValue) => set({ inTerminal: newValue }),
  setDelayed: (newValue) => set({ delayed: newValue }),
  setSelectedCount: (newValue) => set({ selectedCount: newValue }),
  setTimestamp: (newValue) => set({ timestamp: newValue }),
  setData: (newValue) => set({ busesData: newValue }),
  updateBusData (newBusData) {
    const buses = get().busesData
    const newBuses = [...buses]
    for (const busIdx in buses) {
      const bus = buses[busIdx]
      if (newBusData.id === bus.id) {
        newBuses[busIdx] = newBusData
        set({ busesData: newBuses })
      }
    }
    return newBuses
  },
  addBusData (newBus) {
    const newBuses = [...get().busesData, newBus]
    set({ busesData: newBuses })
    return newBuses
  },
  removeBusData (busId) {
    const newBuses = get().busesData.filter((bus) => bus.id !== busId)
    set({ busesData: newBuses })
    return newBuses
  },
  updateBusState (busId, newState) {
    set({
      busesData: get().busesData.map((bus) => {
        if (bus.id === busId) {
          bus.state = newState
        }
        return bus
      })
    }) 
  }
}))
