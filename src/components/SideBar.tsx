import { links } from '@/lib/utils'
import { useMenuStore } from '@/stores/useMenuStore'
import { useId } from 'preact/compat'
import { CloseSidebar } from './CloseSidebar'
import { ThemeSelector } from './ThemeSelector'
import { LoginButton } from './LoginButton'
import { RegisterButton } from './RegisterButton'

export function SideBar ({ pathname }: { pathname: string }) {
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore((state) => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <aside
        class={`${isMenuOpen ? 'menuOpen' : ''} [&.menuOpen]:right-0 -right-sidebar max-w-full overflow-y-auto mb-4 transition-[right] fixed top-0 w-sidebar min-w-fit h-full flex flex-col xl:hidden duration-300 z-[2] px-8 [scrollbar-width:thin] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
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
          <RegisterButton class='w-full text-center' />
          <LoginButton class='w-full text-center' />
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
