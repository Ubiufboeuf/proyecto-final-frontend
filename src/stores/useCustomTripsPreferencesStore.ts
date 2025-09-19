import { create } from 'zustand'

type SelectableBusesTypes = {
  tripType: string
  busType: string
  origin: string
  destination: string
  departure_date: string
  arrival_date: string
  passengers: number
  preferred_time: number
  setSelected: (newSelected: boolean) => void
}

export const useSelectableBusesTypesStore = create<SelectableBusesTypes>((set) => ({
  tripType: false,
  setSelected: (newSelected) => set({ tripType: newSelected })
}))
