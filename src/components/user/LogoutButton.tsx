import { ENDPOINTS } from '@/lib/constants'
import { errorHandler } from '@/lib/utils'
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
      const res = await fetch(ENDPOINTS.LOGOUT, {
        method: 'POST',
        credentials: 'include'
      })

      if (!res.ok) {
        alert('Error cerrando sesión')
        return
      }
      
      let text = ''
      let data = null
      let errorParsingJSON: unknown | false = false

      try {
        text = await res.text()
        data = JSON.parse(text)
      } catch (err) {
        errorParsingJSON = err
      }

      if (errorParsingJSON !== false) {
        try {
          errorHandler(null, 'Error parseando la respuesta al cerrar sesión')
          // console.log('php data as text:', text)
          return
        } catch (err) {
          errorHandler(err, 'Error mostrando la respuesta del servidor al cerrar sesión')
          return
        }
      }

      // console.log('php data as json:', data)
      if (data.message) alert(data.message)
      if (data.success) location.href = '/'
    } catch {
      alert('Error de red al cerrar sesión')
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
