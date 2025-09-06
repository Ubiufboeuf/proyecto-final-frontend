import { useMenuStore } from '@/stores/useMenuStore'
import type { CSSProperties } from 'preact/compat'

export function CloseSidebar ({ class: className, style }: { class?: string, style?: CSSProperties }) {
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore((state) => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <button
      class={`h-fit w-full p-2 min-h-10 border transition-colors rounded-lg flex xl:hidden items-center justify-center cursor-pointer border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-gray-700 touch:active:bg-orange-50 touch:active:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-orange-50 dark:hover:border-orange-50 dark:touch:active:bg-gray-700 dark:touch:active:text-orange-50 dark:touch:active:border-orange-50
      ${className}`}
      style={style}
      onClick={toggleMenu}
    >
      Cerrar menú
    </button>
  )
}
