import { create } from 'zustand'

type ContactsStore = {
  isModalOpen: boolean,
  setIsModalOpen: (newState: boolean) => void
}

export const useContactsStore = create<ContactsStore>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (newState) => set({ isModalOpen: newState })
}))
