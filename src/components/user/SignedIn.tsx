import { useUserStore } from '@/stores/useUserStore'
import type { ReactNode } from 'preact/compat'

export function SignedIn ({ children }: { children: ReactNode }) {
  const isAuth = useUserStore((state) => state.isAuth)

  if (!isAuth) return

  return children
}
