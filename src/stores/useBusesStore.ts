import type { Bus, BusesData, BusStates } from '@/env'
import { create } from 'zustand'
import { getBaseBusesData, getBusesData } from '@/services/busService'

let busesData: BusesData = getBaseBusesData()
try {
  busesData = await getBusesData()
} catch (err) {
  console.error(err)
}

type BusesStore = BusesData & {
  setCount: (newValue: number) => void
  setInMovement: (newValue: number) => void
  setInTerminal: (newValue: number) => void
  setDelayed: (newValue: number) => void
  setSelectedCount: (newValue: number) => void
  setTimestamp: (newValue: number) => void
  setBuses: (newValue: Array<Bus>) => void
  updateBuses: (newBuses: Bus) => Bus[]
  addBus: (newBus: Bus) => Bus[]
  removeBus: (busId: string) => Bus[]
  updateBusState: (busId: string, newState: BusStates) => void
  setBusesData: (busesData: BusesData) => void
  /* count: 12,
  inMovement: 5,
  selected: 0,
  inTerminal: 0,
  delayed: 4,
  timestamp: 0, */
}

export const useBusesStore = create<BusesStore>((set, get) => ({
  ...busesData,
  setBusesData: (busesData) => set({...busesData}),
  setCount: (newValue) => set({ count: newValue }),
  setInMovement: (newValue) => set({ inMovement: newValue }),
  setInTerminal: (newValue) => set({ inTerminal: newValue }),
  setDelayed: (newValue) => set({ delayed: newValue }),
  setSelectedCount: (newValue) => set({ selectedCount: newValue }),
  setTimestamp: (newValue) => set({ timestamp: newValue }),
  setBuses: (newValue) => set({ buses: newValue }),
  updateBuses (newBusData) {
    const { buses } = get()
    
    if (!buses) return []
    
    const newBuses = [...buses]
    for (const busIdx in buses) {
      const bus = buses[busIdx]
      if (newBusData.id === bus.id) {
        newBuses[busIdx] = newBusData
        set({ buses: newBuses })
      }
    }
    return newBuses
  },
  addBus (newBus) {
    const newBuses = [...get().buses ?? [], newBus]
    set({ buses: newBuses })
    return newBuses
  },
  removeBus (busId) {
    const { buses } = get()

    if (!buses) return []

    const newBuses = buses.filter((bus) => bus.id !== busId)
    set({ buses: newBuses })
    return newBuses
  },
  updateBusState (busId, newState) {
    const { buses } = get()
    
    if (!buses) return
    
    set({
      buses: buses.map((bus) => {
        if (bus.id === busId) {
          bus.state = newState
        }
        return bus
      })
    }) 
  }
}))
