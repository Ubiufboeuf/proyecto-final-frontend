import { create } from 'zustand'

type MenuStore = {
  isMenuOpen: boolean
  setIsMenuOpen: (newState: boolean) => void
}

export const useMenuStore = create<MenuStore>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (newState) => set({ isMenuOpen: newState })
}))
