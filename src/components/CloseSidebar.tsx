import { useMenuStore } from '@/stores/useMenuStore'
import type { CSSProperties } from 'preact/compat'

export function CloseSidebar ({ class: className, style }: { class?: string, style?: CSSProperties }) {
  const isMenuOpen = useMenuStore(state => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore(state => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }
  
  return (
    <button
      class={`h-fit w-full p-2 min-h-10 border-orange-500 border hover:bg-orange-50 text-orange-500 hover:text-gray-700 transition-colors rounded-lg flex ml:hidden items-center justify-center cursor-pointer ${className}`}
      style={style}
      onClick={toggleMenu}
    >
      Cerrar menú
    </button>
  )
}
