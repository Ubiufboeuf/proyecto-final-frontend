import { Icon } from '@/components/Icon'
import type { BusType } from '@/env'
import { useEffect, useId } from 'preact/hooks'

export function SelectableBusTypeLight ({ busType: { icon: TypeIcon, type, title, borderColor, bgColor: backgroundColor, mainColor: color, capacity, tags }, updateBusCapacity }: { busType: BusType, updateBusCapacity: (type: string | undefined) => void }) {
  function matchSelectableBusType () {
    const selectedBusType = document.querySelector('label:has([name=inputBusTypeLight]:checked)')
    if (!(selectedBusType instanceof HTMLElement)) return

    const { type } = selectedBusType.dataset
    const selectedBusTypeToSelect = document.querySelector(`label:has([name=inputBusTypeDark])[data-type=${type}]`)

    if (!selectedBusTypeToSelect || !(selectedBusTypeToSelect.children[0] instanceof HTMLInputElement)) return
    selectedBusTypeToSelect.children[0].checked = true

    updateBusCapacity(type)
  }

  useEffect(() => {
    matchSelectableBusType()
  }, [])

  return (
    <label
      class='dark:hidden w-full max-w-160 h-full p-6 flex flex-col items-center gap-4 text-sm rounded-xl cursor-pointer transition-colors border-2 group bg-[var(--bgColor)] text-[var(--color)] has-checked:bg-orange-100 has-checked:border-orange-400 hover:border-orange-500/50 border-[var(--borderColor)]'
      style={{
        '--borderColor': borderColor,
        '--bgColor': backgroundColor,
        '--color': color
      }}
      onChange={matchSelectableBusType}
      data-type={type}
    >
      <input type='radio' name='inputBusTypeLight' className='absolute left-31 top-10 opacity-0 pointer-events-none' required />
      <div class='w-full h-fit flex items-center gap-2'>
        <Icon class='size-6' style={{ color }}>
          <TypeIcon />
        </Icon>
        <h1 class='flex items-center justify-center text-lg font-bold uppercase text-center'>
          {title}
        </h1>
      </div>
      <div class='flex items-center w-full'>
        {/* <p class='opacity-80'>
          {description}
        </p> */}
      </div>
      <div class='flex flex-col justify-center w-full gap-2'>
        <p class='text-xs opacity-80'>Capacidad: {capacity} pasajeros</p>
        <div class='w-full flex flex-wrap gap-1'>
          { tags.map(({ tag, title }) => (
              <span
                key={useId()}
                title={title}
                class='text-xs bg-white px-2 p-1 rounded'
              >
                {tag}
              </span>
          )) }
        </div>
      </div>
    </label>
  )
}
