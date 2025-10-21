import { create } from 'zustand'

type TrackUIStore = {
  isUIVisible: boolean
  setIsUIVisible: (newState: boolean) => void
}

export const useTrackUIStore = create<TrackUIStore>((set) => ({
  isUIVisible: true,
  setIsUIVisible: (newState) => set({ isUIVisible: newState })
}))

