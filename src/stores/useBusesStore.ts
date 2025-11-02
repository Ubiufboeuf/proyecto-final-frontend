import type { Bus, BusesData, BusStates, Point } from '@/env'
import { create } from 'zustand'
import { getBaseBusesData, getBusesData } from '@/services/busService'

let busesData: BusesData = getBaseBusesData()
try {
  busesData = await getBusesData()
} catch (err) {
  console.error(err)
}

const { buses, selectedCount, count, delayed, inMovement, inTerminal, timestamp } = busesData

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
  updateBusPosition: (busId: string, newPosition: Point) => void
  setBusesData: (busesData: BusesData) => void
  updateBusSelectedState: (bus: Bus, isSelected: boolean) => void
  updateBus: (bus: Bus) => void
  selectedBuses: Bus[]
  updateSelectedBuses: () => void
}

export const useBusesStore = create<BusesStore>((set, get) => ({
  buses,
  count: count || (buses ? buses.length + 1 : 0),
  selectedCount,
  delayed,
  inMovement,
  inTerminal,
  timestamp,
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
  updateBusPosition (busId, newPosition) {
    const { buses } = get()
    
    if (!buses) return
    
    set({
      buses: buses.map((bus) => {
        if (bus.id === busId) {
          bus.location.position = newPosition
        }
        return bus
      })
    }) 
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
  },
  updateBusSelectedState (bus, selected) {
    const { buses } = get()
    const busIdx = buses?.findIndex((b) => b.id === bus.id)
    
    if (busIdx == null || busIdx === -1 || !buses) return

    set({
      buses: buses.toSpliced(busIdx, 1, {
        ...bus,
        selected
      })
    })
  },
  updateBus (bus) {
    const { buses } = get()
    const busIdx = buses?.findIndex((b) => b.id === bus.id)
    
    if (!buses || busIdx === -1 || busIdx == undefined) return

    set((state) => ({
      buses: [
        ...state.buses!.toSpliced(busIdx, 1, bus)
      ]
    }))
  },
  updateSelectedBuses () {
    const { buses } = get()

    const selectedBuses: Bus[] = []

    for (const bus of buses || []) {
      if (!bus.selected) continue

      selectedBuses.push(bus)
    }

    set({ selectedBuses })
  },
  selectedBuses: []
}))
