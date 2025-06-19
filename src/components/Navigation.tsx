import { Icon } from './Icon'
import { useId } from 'preact/compat'
import { IconBus, IconMenu } from './Icons'
import { useMenuStore } from '@/stores/useMenuStore'
import { links } from '@/lib/utils'

export function Navigation ({ pathname }: { pathname: string }) {
  const isMenuOpen = useMenuStore(state => state.isMenuOpen)
  const setIsMenuOpen = useMenuStore(state => state.setIsMenuOpen)

  function toggleMenu () {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className='z-[3] w-full h-navbar px-8 pl-4 bg-primary fixed top-0 left-0 flex justify-center items-center text-background'>
        <div className='h-full w-full max-w-screen-xl flex items-center ml:justify-center justify-between'>
          <aside className='h-full w-fit'>
            <a href='/' className='aspect-square outline-0 h-full max-h-full w-fit p-2 px-4 flex items-center justify-center gap-4'>
              <Icon class='size-8'>
                <IconBus />
              </Icon>
              <div className='flex flex-col justify-start'>
                <strong className='text-nowrap text-xl'>Berrutti Turismo</strong>
                <span className='text-nowrap text-sm'>Acortando distancias</span>
              </div>
            </a>
          </aside>
          <nav className='h-full w-full flex-1 hidden ml:flex items-center justify-center gap-0'>
            {
              links.map(({ link, name }) => {
                const id = useId()
                return (
                  <a
                    key={id}
                    href={link}
                    className='hover:text-orange-100/80 hover:transition-colors p-2 px-3'
                  >
                    <span className={link === pathname ? 'border-b-2 pb-1 transition-[padding]' : ''}>
                      {name}
                    </span>
                  </a>   
                )
              })
            }
          </nav>
          <aside className='h-full w-fit flex items-center justify-end gap-4'>
            <a href='/reserve' className='bg-background text-nowrap rounded-lg text-primary p-2 px-4 hover:bg-background/90 transition-colors active:bg-background/80'>Reservar Ahora</a>
            <button
              className='h-fit w-fit p-2 hover:bg-background/15 active:bg-background/25 transition-colors rounded-lg flex ml:hidden items-center justify-center cursor-pointer'
              onClick={toggleMenu}
            >
              <Icon>
                <IconMenu />
              </Icon>
            </button>
          </aside>
        </div>
      </header>
    </>
  )
}
