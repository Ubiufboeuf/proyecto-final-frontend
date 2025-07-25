import type { Ruta } from '@/env'
import { create } from 'zustand'

type RoutesModal = {
  isModalOpen: boolean
  modalInfo: Ruta | null
  setIsModalOpen: (newState: boolean) => void
  setModalInfo: (newInfo: Ruta) => void
}

export const useRoutesModal = create<RoutesModal>((set) => ({
  isModalOpen: false,
  modalInfo: null,
  setIsModalOpen: (newState) => set({ isModalOpen: newState }),
  setModalInfo: (newInfo) => set({ modalInfo: newInfo })
}))
