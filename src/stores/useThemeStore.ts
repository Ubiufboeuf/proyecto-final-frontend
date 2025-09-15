import type { ColorTheme } from '@/env'
import { create } from 'zustand'

type ThemeStore = {
  theme: ColorTheme | undefined
  setTheme: (newTheme: ColorTheme) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: undefined,
  setTheme: (newTheme) => set({ theme: newTheme })
}))
