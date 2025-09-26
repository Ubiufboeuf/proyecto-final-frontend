import { Icon } from '@/components/Icon'
import type { BusType } from '@/env'
import { useEffect, useId } from 'preact/hooks'

export function SelectableBusTypeDark ({ busType: { icon: TypeIcon, type, title, description, capacity, tags, darkColor } }: { busType: BusType }) {
  function matchSelectableBusType () {
    const selectedBusType = document.querySelector('label:has([name=inputBusTypeDark]:checked)')
    if (!(selectedBusType instanceof HTMLElement)) return

    const { type } = selectedBusType.dataset
    const selectedBusTypeToSelect = document.querySelector(`label:has([name=inputBusTypeLight])[data-type=${type}]`)

    if (!selectedBusTypeToSelect || !(selectedBusTypeToSelect.children[0] instanceof HTMLInputElement)) return
    selectedBusTypeToSelect.children[0].checked = true
  }

  useEffect(() => {
    matchSelectableBusType()
  }, [])

  return (
    <label
      class='hidden dark:flex w-full max-w-160 h-full p-6 flex-col items-center gap-4 text-sm rounded-xl cursor-pointer transition-colors bg-gray-700/50 text-gray-300 has-checked:bg-gray-600 hover:bg-gray-600/50 touch:active:bg-gray-600/50'
      onInput={matchSelectableBusType}
      data-type={type}
    >
      <input type='radio' name='inputBusTypeDark' hidden />
      <div class='w-full h-fit flex items-center gap-2'>
        <Icon class='size-6' style={{ color: darkColor }}>
          <TypeIcon />
        </Icon>
        <h1 class='flex items-center justify-center text-lg font-bold uppercase text-center text-gray-50'>
          {title}
        </h1>
      </div>
      <div class='flex items-center w-full'>
        <p class='opacity-80'>
          {description}
        </p>
      </div>
      <div class='flex flex-col justify-center w-full gap-2'>
        <p class='text-xs opacity-80'>Capacidad: {capacity} pasajeros</p>
        <div class='w-full flex flex-wrap gap-1'>
          { tags.map(({ tag, title }) => (
              <span
                key={useId()}
                title={title}
                class='text-xs bg-white dark:bg-gray-500/50 px-2 p-1 rounded'
              >
                {tag}
              </span>
          )) }
        </div>
      </div>
    </label>
  )
}
