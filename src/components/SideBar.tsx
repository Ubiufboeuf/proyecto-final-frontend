import { links } from '@/lib/utils'
import { useMenuStore } from '@/stores/useMenuStore'
import { useId } from 'preact/compat'
import { CloseSidebar } from './CloseSidebar'

export function SideBar ({ pathname }: { pathname: string }) {
  const isMenuOpen = useMenuStore(state => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore(state => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <aside
        class={`${isMenuOpen ? 'menuOpen' : ''} [&.menuOpen]:right-0 -right-sidebar overflow-y-auto mb-4 transition-[right] fixed top-0 w-sidebar h-screen bg-white text-gray-800 flex flex-col justify-end ml:hidden duration-300 z-[2] px-8`}
      >
        <header class='h-navbar min-h-navbar w-full flex items-center justify-center'>
          <CloseSidebar />
        </header>
        <main class='h-full w-full flex flex-col items-center gap-2 min-h-fit'>
          {
            links.map(({ link, name }) => (
              <a
                key={useId()}
                href={link}
                class='hover:text-orange-500 transition-colors p-2 w-full text-center'
              >
                <span class={link === pathname ? 'text-orange-500' : ''}>
                  {name}
                </span>
              </a>   
            ))
          }
        </div>
      </aside>
      <button
        class='fixed h-screen w-screen z-[1] left-0 top-0 bg-black/40 ml:hidden cursor-pointer'
        hidden={!isMenuOpen}
        onClick={toggleMenu}
      />
    </>
  )
}
