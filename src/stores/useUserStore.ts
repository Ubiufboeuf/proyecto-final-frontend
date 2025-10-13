import { create } from 'zustand'

type userStore = {
  isAuth: boolean
  setIsAuth: (newValue: boolean) => void
}

export const useUserStore = create<userStore>((set) => ({
  isAuth: false,
  setIsAuth: (newValue) => set({ isAuth: newValue })
}))
