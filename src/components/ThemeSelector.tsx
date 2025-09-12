import { useEffect, useState } from 'preact/hooks'
import { Icon } from './Icon'
import { IconMoon, IconSun, IconComputer } from './Icons'
import type { ColorTheme, ThemeOptions } from '@/env'
import { getThemeCookie, setThemeCookie } from '@/lib/theme'
import type { ChangeEvent } from 'preact/compat'
import { errorHandler } from '@/lib/utils'

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

export function ThemeSelector ({ buttonClass }: { buttonClass?: string }) {
  const [isThemeListOpen, setIsThemeListOpen] = useState(false)
  const [theme, setTheme] = useState<ColorTheme>()

  function toggleSelect (event: ChangeEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setIsThemeListOpen((isOpen) => !isOpen)
  }

  const changeTheme = (theme: ColorTheme) => () => {
    setThemeCookie(theme)
    setTheme(theme)
  }
  
  function isValidTheme (themeStr: unknown): themeStr is ColorTheme {
    return themeStr === 'light' || themeStr === 'dark' || themeStr === 'system'
  }

  function handleClickToCloseList (event: MouseEvent) {
    const element = event.target
    if (!(element instanceof HTMLElement)) return
    
    const themeList = document.querySelector('#themeList')
    if (themeList?.contains(element) || element.id === 'toggleTheme') return

    setIsThemeListOpen(false)
  }

  function updateTheme (newValue: string = 'system') {
    try {
      if (isValidTheme(newValue)) {
        setTheme(newValue)
      }
    } catch (err) {
      errorHandler('Error al cambiar el tema', err)
    }
  }

  useEffect(() => {
    const theme = getThemeCookie()
    updateTheme(theme.value)

    document.addEventListener('click', handleClickToCloseList)

    return () => {
      document.removeEventListener('click', handleClickToCloseList)
    }
  }, [])

  useEffect(() => {
    if (theme) {
      setThemeCookie(theme)
      document.documentElement.setAttribute('data-theme', theme)
    }

    const cookie = getThemeCookie()
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
              <span class='text-nowrap'>{name}</span>
            </button>
          ))
        }
      </section>
      <button
        id='toggleTheme'
        class={`${buttonClass} h-fit w-fit p-2 px-3 gap-3 min-h-10 transition-colors rounded-lg flex items-center justify-center cursor-pointer ml-auto text-gray-700 hover:bg-gray-200 touch:active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-orange-50 dark:touch:active:bg-gray-700 dark:touch:active:text-orange-50 `}
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
