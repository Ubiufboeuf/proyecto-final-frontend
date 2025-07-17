import { Icon } from '@/components/Icon'
import { IconMenu } from '@/components/Icons'
import { useMenuStore } from '@/stores/useMenuStore'
import type { CSSProperties } from 'preact/compat'

export function ToggleSidebar ({ class: className, style }: { class?: string, style?: CSSProperties }) {
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore((state) => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }
  
  return (
    <button
      class={`h-fit w-fit p-2 aspect-square min-h-10 hover:bg-gray-200 transition-colors rounded-lg flex items-center justify-center cursor-pointer ${className}`}
      style={style}
      onClick={toggleMenu}
    >
      <Icon>
        <IconMenu />
      </Icon>
    </button>
  )
}
