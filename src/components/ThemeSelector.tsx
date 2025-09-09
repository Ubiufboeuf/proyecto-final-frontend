import { useEffect, useState } from 'preact/hooks'
import { Icon } from './Icon'
import { IconMoon, IconSun, IconComputer } from './Icons'
import type { ColorTheme, ThemeOptions } from '@/env'
import { getThemeCookie, setThemeCookie } from '@/lib/theme'

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
  const [theme, setTheme] = useState<ColorTheme>()

  function toggleSelect () {
    setIsThemeListOpen((isOpen) => !isOpen)
  }

  const changeTheme = (theme: ColorTheme) => () => {
    setThemeCookie('berrutti-web-theme', theme)
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
      const themeStr = getThemeCookie('berrutti-web-theme').value || 'system'

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
    if (theme) {
      setThemeCookie('berrutti-web-theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }

    const cookie = getThemeCookie('berrutti-web-theme')
    document.documentElement.setAttribute('data-theme', cookie.value)
  }, [theme])

  return (
    <section class='h-fit w-full relative'>
      <section
        id='themeList'
        class={`${isThemeListOpen ? 'themeListOpen' : ''} [&.themeListOpen]:h-fit [&.themeListOpen]:py-2 h-0 overflow-hidden [transition:height_250ms_ease,padding-block_250ms_ease] [interpolate-size:allow-keywords] absolute bottom-13 right-0 bg-gray-200 dark:bg-gray-700 rounded-lg py-0 px-2 gap-1.5 flex flex-col`}
      >
        {
          themeOptions.map(({ icon: ThemeIcon, name, theme: themeOption }) => (
            <button
              key={`themeOption-${themeOption}`}
              class={`${themeOption === theme ? 'selected' : ''} [&.selected]:bg-gray-50 dark:[&.selected]:bg-gray-600 flex items-center justify-start gap-2 w-full h-fit p-2 px-3 touch:active:bg-gray-50 hover:bg-gray-50 dark:touch:active:bg-gray-600 dark:hover:bg-gray-600 cursor-pointer transition-colors rounded-lg text-gray-700 dark:text-gray-100`}
              onClick={changeTheme(themeOption)}
              tabIndex={isThemeListOpen ? 0 : -1}
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
        class='h-fit w-fit p-2 px-3 gap-2 min-h-10 transition-colors rounded-lg flex items-center justify-center cursor-pointer ml-auto border-2 border-gray-200 dark:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-200 hover:text-gray-700 touch:active:bg-gray-2002 touch:active:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-orange-50 dark:hover:border-orange-50 dark:touch:active:bg-gray-700 dark:touch:active:text-orange-50 dark:touch:active:border-orange-50'
        onClick={toggleSelect}
      >
        <strong>Tema</strong>
        <Icon class='size-6'>
          <IconMoon hidden={theme !== 'dark'} />
          <IconSun hidden={theme !== 'light'} />
          <IconComputer hidden={theme !== 'system'} />
        </Icon>
      </button>
    </section>
  )
}
