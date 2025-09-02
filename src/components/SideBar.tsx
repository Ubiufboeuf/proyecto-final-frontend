import { links } from '@/lib/utils'
import { useMenuStore } from '@/stores/useMenuStore'
import { useId } from 'preact/compat'
import { CloseSidebar } from './CloseSidebar'
import { ThemeSelector } from './ThemeSelector'

export function SideBar ({ pathname }: { pathname: string }) {
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore((state) => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <aside
        class={`${isMenuOpen ? 'menuOpen' : ''} [&.menuOpen]:right-0 -right-sidebar max-w-full overflow-y-auto mb-4 transition-[right] fixed top-0 w-sidebar min-w-fit h-full bg-white text-gray-800 flex flex-col xl:hidden duration-300 z-[2] px-8 [scrollbar-width:thin]`}
      >
        <header class='h-navbar min-h-navbar w-full flex items-center justify-center'>
          <CloseSidebar />
        </header>
        <main class='h-fit w-full flex flex-col items-center gap-2 min-h-fit'>
          {
            links.map(({ link, name, Icon }) => (
              <a
                key={useId()}
                href={link}
                class={`${link === pathname ? 'text-orange-500' : ''} hover:text-orange-500 touch:active:text-orange-500 transition-colors p-2 w-full text-center flex items-center gap-4`}
              >
                <div class='size-6 flex items-center justify-center'>
                  <Icon />
                </div>
                <span class='text-nowrap'>
                  {name}
                </span>
              </a>
            ))
          }
        </main>
        <div class='py-4 flex-1 w-full h-fit min-h-fit flex flex-col items-center justify-end gap-2'>
          <ThemeSelector />
          <a class='w-full text-nowrap rounded-lg p-2 px-4 hover:bg-orange-600 touch:active:bg-orange-600 bg-orange-500 text-white transition-colors cursor-pointer text-center'>
            Registrarse
          </a>
          <a class='w-full text-nowrap rounded-lg p-2 px-4 hover:bg-orange-50 touch:active:bg-orange-50 text-orange-500 hover:text-gray-800 touch:active:text-gray-800 transition-colors border-orange-500 border text-center'>
            Iniciar Sesión
          </a>
        </div>
      </aside>
      <button
        class='fixed h-screen w-screen z-[1] left-0 top-0 bg-black/40 xl:hidden cursor-pointer'
        hidden={!isMenuOpen}
        onClick={toggleMenu}
      />
    </>
  )
}
