import type { ColorTheme } from '@/env'
import { create } from 'zustand'

type ThemeStore = {
  theme: ColorTheme
  setTheme: (newTheme: ColorTheme) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'system',
  setTheme: (newTheme) => set({ theme: newTheme })
}))
