import { tripTypes } from '@/lib/custom-trips'
import type { TripType, TripTypeId } from '@/env'
import { create } from 'zustand'

type SelectableBusesTypes = {
  tripType: TripType | null
  busType: string
  origin: string
  destination: string
  departure_date: string
  arrival_date: string
  passengers: number
  preferred_time: number
  setTripTypeById: (tripTypeId: TripTypeId) => TripType | undefined
}

export const useCustomTripPreferences = create<SelectableBusesTypes>((set) => ({
  tripType: null,
  busType: '',
  origin: '',
  destination: '',
  departure_date: '',
  arrival_date: '',
  passengers: 0,
  preferred_time: 0,
  setTripTypeById (tripTypeId) {
    const tripType = tripTypes.find((t) => t.id === tripTypeId)
    if (tripType) {
      set({ tripType })
      return tripType
    }
  }
}))

// 280 181 30
