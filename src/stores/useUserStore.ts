import { create } from 'zustand'
import type { AuthStatus, User } from '@/env'

type userStore = {
  isInitialized: boolean
  isAuth: boolean
  isLoading: boolean
  user: User | null
  initializeUser: (newAuthStatus: AuthStatus) => void
  setIsAuth: (newValue: boolean) => void
  setIsLoading: (newValue: boolean) => void
  setUser: (newUser: User | null) => void
}

export const useUserStore = create<userStore>((set) => ({
  isInitialized: false,
  isAuth: false,
  isLoading: false,
  user: null,
  initializeUser: ({ isAuth, isLoading, user }) => set({
    isInitialized: true,
    isAuth,
    isLoading,
    user
  }),
  setIsAuth: (newValue) => set({ isAuth: newValue }),
  setIsLoading: (newValue) => set({ isLoading: newValue }),
  setUser: (newUser) => set({ user: newUser })
}))
