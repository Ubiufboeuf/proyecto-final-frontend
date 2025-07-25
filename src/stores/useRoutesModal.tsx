import { create } from 'zustand'

type RoutesModal = {
  isModalOpen: boolean
  setIsModalOpen: (newState: boolean) => void
}

export const useRoutesModal = create<RoutesModal>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (newState) => set({ isModalOpen: newState })  
}))
