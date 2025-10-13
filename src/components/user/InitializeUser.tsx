import type { User } from '@/env'
import { useUserStore } from '@/stores/useUserStore'
import { useEffect } from 'preact/hooks'

export function InitializeUser ({ isAuth, isLoading, user }: { isAuth: boolean, isLoading: boolean, user: User | null }) {
  const initializeStore = useUserStore((state) => state.initializeUser)
  
  useEffect(() => {
    console.log({ isAuth, isLoading, user })
    initializeStore({ isAuth, isLoading, user })
  }, [])
}

