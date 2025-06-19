import { links } from '@/lib/utils'
import { useMenuStore } from '@/stores/useMenuStore'
import { useId } from 'preact/compat'

export function SideBar ({ pathname }: { pathname: string }) {
  const isMenuOpen = useMenuStore(state => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore(state => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <aside
        className={`${isMenuOpen ? 'menuOpen' : ''} [&.menuOpen]:right-0 -right-sidebar transition-[right] fixed top-0 w-sidebar h-screen pt-navbar bg-black flex items-end ml:hidden duration-300 z-[2]`}
      >
        <div className='h-full w-full bg-primary/90 flex flex-col items-center gap-2 py-4'>
          {
            links.map(({ link, name }) => (
              <a
                key={useId()}
                href={link}
                className='text-background hover:text-orange-100/80 hover:transition-colors p-2 w-full text-center px-4'
              >
                <span className={link === pathname ? 'border-b-2 pb-1 transition-[padding]' : ''}>
                  {name}
                </span>
              </a>   
            ))
          }
        </div>
      </aside>
      <button
        className='fixed h-screen w-screen z-[1] bg-black/40 ml:hidden cursor-pointer'
        hidden={!isMenuOpen}
        onClick={toggleMenu}
      />
    </>
  )
}
