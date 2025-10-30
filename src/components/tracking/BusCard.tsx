import type { Bus, BusStates } from '@/env'
import { IconCheckbox, IconClock, IconMapPin, IconUser } from '../Icons'
import { Icon } from '../Icon'
import { useEffect, useState } from 'preact/hooks'
import { parseTimestamp } from '@/lib/utils'
import { useBusesStore } from '@/stores/useBusesStore'

const states: { [key in BusStates]: string } = {
  'Atrasado': 'delayed',
  'En terminal': 'inTerminal',
  'En viaje': 'inMovement'
}

export function BusCard ({ bus }: { bus: Bus }) {
  const { id, driver, destination, state = 'En terminal', selected: defaultSelected, origin, location, passengers, progress } = bus
  const [isSelected, setIsSelected] = useState<boolean>(defaultSelected)
  const updateBusSelectedState = useBusesStore((state) => state.updateBusSelectedState)
  
  function toggleIsSelected () {
    setIsSelected((isSelected) => !isSelected)
  }

  useEffect(() => {
    updateBusSelectedState(bus, isSelected)
  }, [isSelected])

  useEffect(() => {
    setIsSelected(defaultSelected)
  }, [defaultSelected])

  return (
    <article
      class={`${isSelected ? 'busSelected' : ''} h-fit min-h-fit p-4 w-full border flex-col border-gray-200 rounded-lg flex cursor-pointer group bg-transparent outline-2 [&.busSelected]:outline-orange-500 [&.busSelected]:bg-orange-50 outline-transparent transition-all gap-2 dark:border-0 dark:bg-gray-700/50 dark:hover:bg-gray-700 dark:touch:active:bg-gray-700 dark:outline-0 dark:[&.busSelected]:bg-gray-600`}
      onClick={toggleIsSelected}
    >
      <section class='flex items-center w-full h-fit'>
        <div class='size-7 flex items-center justify-center'>
          <input id={`checkbox-bus-${id}`} type='checkbox' hidden class='pointer-events-none' />
          <Icon class='size-5 text-gray-800 dark:text-gray-300 group-[.busSelected]:scale-110'>
            { isSelected
              ? <IconCheckbox class='text-orange-500' checked={'color'} />
              : <IconCheckbox />
            }
          </Icon>
        </div>
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
      <section>
        <div class='w-full text-xs justify-between flex items-center h-fit text-gray-500 dark:text-gray-400 pb-1'>
          <span>Progreso</span>
          <span>{progress}%</span>
        </div>
        <div class='h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden'>
          <div class='rounded-full h-full bg-orange-500 dark:bg-orange-600-light' style={{ width: `${progress}%` }} />
        </div>
      </section>
    </article>
  )
}
