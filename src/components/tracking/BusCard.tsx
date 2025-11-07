import type { Bus, BusStates } from '@/env'
import { IconCheckbox, IconClock, IconLock, IconLockOpen, IconMapPin, IconUser } from '../Icons'
import { Icon } from '../Icon'
import { useEffect, useState } from 'preact/hooks'
import { parseTimestamp } from '@/lib/utils'
import { useBusesStore } from '@/stores/useBusesStore'
import type { ChangeEvent } from 'preact/compat'

const states: { [key in BusStates]: string } = {
  'Atrasado': 'delayed',
  'En terminal': 'inTerminal',
  'En viaje': 'inMovement'
}

export function BusCard ({ bus }: { bus: Bus }) {
  const { id, driver, destination, state = 'En terminal', selected: defaultSelected, origin, location, passengers } = bus
  const [isSelected, setIsSelected] = useState<boolean>(defaultSelected)
  const updateBusSelectedState = useBusesStore((state) => state.updateBusSelectedState)
  const changeBusToFocus = useBusesStore((state) => state.changeBusToFocus)
  const lockedBus = useBusesStore((state) => state.busToFocus)
  
  function toggleIsSelected (event: ChangeEvent) {
    const { target } = event
    if (!(target instanceof HTMLElement)) return
    
    setIsSelected((isSelected) => !isSelected)
  }

  function handleBusToFocus (event: InputEvent) {
    event.stopPropagation()
    if (lockedBus === bus.id) {
      changeBusToFocus(null)
      return
    }
    changeBusToFocus(bus.id)
    if (!isSelected) setIsSelected(true)
  }
  
  useEffect(() => {
    if (!isSelected && lockedBus === bus.id) {
      changeBusToFocus(null)
    }
    updateBusSelectedState(bus, isSelected)
  }, [isSelected])

  useEffect(() => {
    setIsSelected(defaultSelected)
  }, [defaultSelected])

  return (
    <button
      class={`${isSelected ? 'busSelected' : ''} group flex flex-col gap-2 h-fit min-h-fit w-full p-4 rounded-lg border outline-2 text-start cursor-pointer transition-colors

      bg-white border-gray-200 outline-transparent [&.busSelected]:bg-orange-50 [&.busSelected]:outline-orange-500 hover:outline-orange-300 touch:active:outline-orange-300 focus-visible:outline-gray-700 focus-visible:[.busSelected]:outline-gray-700! hover:has-[.card-option:hover]:not-focus-visible:outline-transparent touch:active:has-[.card-option:hover]:not-focus-visible:outline-transparent [&.busSelected]:hover:has-[.card-option:hover]:outline-orange-500 [&.busSelected]:touch:active:has-[.card-option:hover]:outline-orange-500
      
      dark:bg-gray-700/50 dark:border-transparent dark:[&.busSelected]:bg-gray-700 dark:[&.busSelected]:outline-gray-500 dark:hover:outline-gray-600 dark:touch:active:outline-gray-600 dark:focus-visible:outline-gray-300 dark:focus-visible:[.busSelected]:outline-gray-300! dark:hover:has-[.card-option:hover]:not-focus-visible:outline-transparent dark:touch:active:has-[.card-option:hover]:not-focus-visible:outline-transparent dark:[&.busSelected]:hover:has-[.card-option:hover]:outline-gray-500 dark:[&.busSelected]:touch:active:has-[.card-option:hover]:outline-gray-500
      `}
      onClick={toggleIsSelected}
    >
      <section class='flex items-center w-full h-fit'>
        <label class='size-7 flex items-center justify-center cursor-pointer'>
          <input id={`checkbox-bus-${id}`} type='checkbox' hidden />
          <Icon class='size-5 text-gray-800 dark:text-gray-300 group-[.busSelected]:scale-110'>
            { isSelected
              ? <IconCheckbox class='text-orange-500' checked={'color'} />
              : <IconCheckbox />
            }
          </Icon>
        </label>
        <div class='flex flex-col justify-center'>
          <span class='px-2 text-gray-800 dark:text-gray-100 font-semibold'>#{id}</span>
          <span class='text-xs px-2 text-gray-600 dark:text-gray-300'>{driver.name}</span>
        </div>
        <span class={`${states[state]} ml-auto rounded-full text-xs font-semibold p-1 px-2.5
          [&.delayed]:text-red-700 [&.delayed]:bg-red-100 dark:[&.delayed]:text-red-200 dark:[&.delayed]:bg-red-700/70
          [&.inTerminal]:text-blue-700 [&.inTerminal]:bg-blue-100 dark:[&.inTerminal]:text-blue-200 dark:[&.inTerminal]:bg-blue-700/70
          [&.inMovement]:text-green-700 [&.inMovement]:bg-green-100 dark:[&.inMovement]:text-green-200 dark:[&.inMovement]:bg-green-700/70
          text-gray-700 bg-gray-100
        `}>
          {state}
        </span>
      </section>
      <section class='flex flex-col text-gray-600 dark:text-gray-300 gap-2'>
        <h2 class='text-gray-800 dark:text-gray-50 text-sm font-medium'>{origin.location} - {destination.location}</h2>
        <span class='flex items-center text-xs gap-2'>
          <Icon class='size-3'>
            <IconMapPin />
          </Icon>
          <span>{location.city}</span>
        </span>
        <span class='flex items-center text-xs gap-2'>
          <Icon class='size-3'>
            <IconClock />
          </Icon>
          <span>{parseTimestamp(origin.timestamp, { output: 'hour-minute', format: '24 hrs' })} → {parseTimestamp(destination.timestamp, { output: 'hour-minute', format: '24 hrs' })}</span>
        </span>
        <span class='flex items-center text-xs gap-2'>
          <Icon class='size-3'>
            <IconUser />
          </Icon>
          <span>{passengers.onBoard}/{passengers.capacity} {passengers.onBoard === 1 ? 'pasajero' : 'pasajeros'}</span>
        </span>
      </section>
      <section class='card-options pt-1'>
        <label
          class='card-option flex items-center justify-center gap-1.5 w-34 h-fit max-w-full p-1.5 px-2 outline-0 border-2 rounded-md text-xs cursor-pointer transition-colors
          bg-white text-gray-700 border-gray-300 hover:border-orange-500/50 has-checked:bg-orange-100/70 has-checked:border-orange-400/50
          dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:has-checked:bg-gray-600 dark:has-checked:border-gray-500'
          onClick={(e) => e.stopPropagation()}
          onInput={handleBusToFocus}
        >
          <input
            id={`checkbox-bus-${id}-focus`}
            type='checkbox'
            class='pointer-events-none'
            checked={lockedBus === bus.id}
            hidden
          />
          <Icon class='size-5 text-gray-800 dark:text-gray-300'>
            { lockedBus === bus.id
                ? <IconLockOpen />
                : <IconLock />
            }
          </Icon>
          { lockedBus === bus.id
              ? 'Dejar de seguir'
              : 'Seguir ómnibus'
          }
        </label>
      </section>
      {/* <section>
        <div class='w-full text-xs justify-between flex items-center h-fit text-gray-500 dark:text-gray-400 pb-1'>
          <span>Progreso</span>
          <span>{progress}%</span>
        </div>
        <div class='h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden'>
          <div class='rounded-full h-full bg-orange-500 dark:bg-orange-600-light' style={{ width: `${progress}%` }} />
        </div>
      </section> */}
    </button>
  )
}
