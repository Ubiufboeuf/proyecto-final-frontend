import { useState } from 'preact/hooks'
import { Icon } from './Icon'
import { IconMoon, IconSun, IconComputer } from './Icons'

const themeOptions = [
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
  const [themeListIsOpen, setSelectIsOpen] = useState(false)

  function openSelect () {
    const isOpen = themeListIsOpen
    setSelectIsOpen(!isOpen)
  }

  return (
    <section class='h-fit w-full relative'>
      <section class={`${themeListIsOpen ? 'themeListOpen' : ''} absolute bottom-13 right-0 bg-gray-200 rounded-lg p-2`}>
        {
          themeOptions.map(({ icon: ThemeIcon, name, theme }) => (
            <article key={`themeOption-${theme}`} class='flex items-center justify-start gap-2 w-full h-fit p-2 px-3 active:bg-gray-50 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg text-gray-700'>
              <Icon class='size-6'>
                <ThemeIcon />
              </Icon>
              <span>{name}</span>
            </article>
          ))
        }
      </section>
      <button class='h-fit w-fit p-2 aspect-square min-h-10 hover:bg-gray-200 dark:hover:bg-neutral-800 dark:touch:active:bg-neutral-800 touch:active:bg-gray-200 transition-colors rounded-lg flex items-center justify-center cursor-pointer ml-auto border-gray-200 border-2' onClick={openSelect}>
        <Icon class='size-6 text-gray-700'>
          <IconSun />
        </Icon>
      </button>
    </section>
  )
}
