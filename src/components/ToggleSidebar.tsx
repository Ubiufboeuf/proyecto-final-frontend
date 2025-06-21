import { Icon } from '@/components/Icon'
import { IconMenu } from '@/components/Icons'
import { useMenuStore } from '@/stores/useMenuStore'

export function ToggleSidebar () {
  const isMenuOpen = useMenuStore(state => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore(state => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }
  
  return (
    <button
      class='h-fit w-fit p-2 hover:bg-background/15 active:bg-background/25 transition-colors rounded-lg flex ml:hidden items-center justify-center cursor-pointer'
      onClick={toggleMenu}
    >
      <Icon>
        <IconMenu />
      </Icon>
    </button>
  )
}
