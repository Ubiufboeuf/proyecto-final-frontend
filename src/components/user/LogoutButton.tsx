import { ENDPOINTS } from '@/lib/constants'
import { useUserStore } from '@/stores/useUserStore'

export function LogoutButton ({ class: className = '' }: { class?: string }) {
  const setIsAuth = useUserStore((state) => state.setIsAuth)
  const setIsLoading = useUserStore((state) => state.setIsLoading)
  const setUser = useUserStore((state) => state.setUser)

  async function handleLogout () {
    // Esto borra los datos se la store del usuario
    setIsAuth(false)
    setIsLoading(false)
    setUser(null)

    // Esto borra la cookie de sesión del usuario
    try {
      const res = await fetch(ENDPOINTS.LOGOUT, { method: 'POST' })
      if (res.ok) {
        location.href = '/'
        return
      }
      
      console.error('Error cerrando la sesión')
    } catch {
      console.error('Error de red al cerrar sesión')
    }
  }
  
  return (
    <button
      className={`text-nowrap rounded-lg p-2 px-4 hover:bg-orange-50 dark:hover:bg-gray-700 touch:active:bg-orange-50 dark:touch:active:bg-gray-700 text-orange-500 hover:text-gray-800 dark:hover:text-orange-50 dark:touch:active:text-orange-50 touch:active:text-gray-800 transition-colors border-orange-500 dark:hover:border-orange-50 dark:touch:active:border-orange-50 border cursor-pointer ${className}`}
      onClick={handleLogout}
    >
      Cerrar sesión
    </button>
  )
}
