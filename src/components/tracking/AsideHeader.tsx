import { Icon } from '@/components/Icon'
import { IconCheckbox } from '@/components/Icons'
import { useBusesStore } from '@/stores/useBusesStore'

export function AsideHeader () {
  const buses = useBusesStore((state) => state.buses)
  const setBuses = useBusesStore((state) => state.setBuses)

  function selectAll () {
    const newBuses = [...buses]
    for (const busIdx in buses) {
      const bus = buses[busIdx]
      bus.selected = true
    }
    setBuses(newBuses)
  }
  
  function unselectAll () {
    const newBuses = [...buses]
    for (const busIdx in buses) {
      const bus = buses[busIdx]
      bus.selected = false
    }
    setBuses(newBuses)
  }
  
  return (
    <header class='h-fit gap-4 w-full border-b border-gray-200 dark:border-0 flex flex-col items-center justify-center p-4 py-3'>
    <div class='w-full h-9 justify-center gap-3 flex'>
      <button
        class='cursor-pointer hover:bg-green-100 touch:active:bg-green-100 hover:text-gray-800 touch:active:text-gray-800 transition-colors bg-green-50 border border-green-200 text-green-700 rounded w-full h-full flex items-center justify-center text-sm gap-3 dark:bg-green-700/50 dark:text-gray-200 dark:border-0 dark:hover:bg-green-800/50 dark:touch:active:bg-green-800/50 dark:hover:text-gray-200 dark:touch:active:text-gray-200'
        onClick={selectAll}
      >
        <Icon class='size-5'>
          <IconCheckbox checked />
        </Icon>
        Todos
      </button>
      <button
        class='cursor-pointer hover:bg-red-100 touch:active:bg-red-100 hover:text-gray-800 touch:active:text-gray-800 transition-colors bg-red-50 border border-red-200 text-red-700 rounded w-full h-full flex items-center justify-center text-sm gap-3 dark:bg-red-700/70 dark:text-gray-200 dark:border-0 dark:hover:bg-red-800/70 dark:touch:active:bg-red-800/70 dark:hover:text-gray-200 dark:touch:active:text-gray-200'
        onClick={unselectAll}
      >
        <Icon class='size-4'>
          <IconCheckbox />
        </Icon>
        Ninguno
      </button>
    </div>
  </header>
  )
}
