import { useEffect, useState } from 'preact/hooks'
import { Icon } from './Icon'
import { IconMoon, IconSun, IconComputer } from './Icons'
import type { ColorTheme, ThemeOptions } from '@/env'
import { useThemeStore } from '@/stores/useThemeStore'

const themeOptions: ThemeOptions[] = [
  {
    name: 'Tema oscuro',
    theme: 'dark',
    icon: IconMoon
  },
  {
    name: 'Tema claro',
    theme: 'light',
    icon: IconSun
  },
  {
    name: 'Según el sistema',
    theme: 'system',
    icon: IconComputer
  }
]

export function ThemeSelector () {
  const [isThemeListOpen, setIsThemeListOpen] = useState(false)
  const setTheme = useThemeStore((state) => state.setTheme)
  const theme = useThemeStore((state) => state.theme)

  function toggleSelect () {
    setIsThemeListOpen((isOpen) => !isOpen)
  }

  const changeTheme = (theme: ColorTheme) => () => {
    setTheme(theme)
  }
  
  function isValidTheme (themeStr: unknown): themeStr is ColorTheme {
    return themeStr === 'light' || themeStr === 'dark' || themeStr === 'system'
  }

  function handleClickToCloseList (event: MouseEvent) {
    const element = event.target
    if (!(element instanceof HTMLElement)) return
    
    const themeList = document.querySelector('#themeList')
    if (themeList?.outerHTML.includes(element.outerHTML) || element.id === 'toggleTheme') return

    setIsThemeListOpen(false)
  }

  useEffect(() => {
    let theme: ColorTheme = 'system'

    try {
      const themeStr = localStorage.getItem('berrutti-web-theme') || 'system'
      if (isValidTheme(themeStr)) {
        theme = themeStr
      }

      setTheme(theme)
    } catch {
      // ↑ Solo para que el usuario no vea el error, pero no hace falta mostrar o hacer nada acá
    }

    document.addEventListener('click', handleClickToCloseList)

    return () => {
      document.removeEventListener('click', handleClickToCloseList)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('berrutti-web-theme', theme)
    // console.log(theme)
    document.documentElement.setAttribute('theme', theme)
  }, [theme])

  return (
    <section class='h-fit w-full relative'>
      <section
        id='themeList'
        class={`${isThemeListOpen ? 'themeListOpen' : ''} [&.themeListOpen]:h-fit [&.themeListOpen]:py-2 h-0 overflow-hidden [transition:height_250ms_ease,padding-block_250ms_ease] [interpolate-size:allow-keywords] absolute bottom-13 right-0 bg-gray-200 rounded-lg py-0 px-2 gap-1.5 flex flex-col`}
      >
        {
          themeOptions.map(({ icon: ThemeIcon, name, theme: themeOption }) => (
            <button
              key={`themeOption-${themeOption}`}
              class={`${themeOption === theme ? 'selected' : ''} [&.selected]:bg-gray-50 flex items-center justify-start gap-2 w-full h-fit p-2 px-3 active:bg-gray-50 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg text-gray-700`}
              onClick={changeTheme(themeOption)}
              tabIndex={themeListIsOpen ? 0 : -1}
            >
              <Icon class='size-6'>
                <ThemeIcon />
              </Icon>
              <span>{name}</span>
            </button>
          ))
        }
      </section>
      <button
        id='toggleTheme'
        class='h-fit w-fit p-2 aspect-square min-h-10 hover:bg-gray-200 dark:hover:bg-neutral-800 dark:touch:active:bg-neutral-800 touch:active:bg-gray-200 transition-colors rounded-lg flex items-center justify-center cursor-pointer ml-auto border-gray-200 border-2'
        onClick={toggleSelect}
      >
        <Icon class='size-6 text-gray-700'>
          <IconMoon hidden={theme !== 'dark'} />
          <IconSun hidden={theme !== 'light'} />
          <IconComputer hidden={theme !== 'system'} />
        </Icon>
      </button>
    </section>
  )
}
