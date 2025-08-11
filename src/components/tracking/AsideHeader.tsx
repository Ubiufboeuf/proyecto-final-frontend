import { Icon } from '@/components/Icon'
import { IconCheckbox } from '@/components/Icons'
import { useBusesStore } from '@/stores/useBusesStore'

export function AsideHeader () {
  const busesData = useBusesStore((state) => state.busesData)
  const setData = useBusesStore((state) => state.setData)

  function selectAll () {
    const newBusesData = [...busesData]
    for (const busIdx in busesData) {
      const bus = busesData[busIdx]
      bus.selected = true
    }
    setData(newBusesData)
  }
  
  function unselectAll () {
    const newBusesData = [...busesData]
    for (const busIdx in busesData) {
      const bus = busesData[busIdx]
      bus.selected = false
    }
    setData(newBusesData)
  }
  
  return (
    <header class='h-fit gap-4 w-full border-b border-gray-200 flex flex-col items-center justify-center p-4 py-3'>
    <div class='w-full h-9 justify-center gap-3 flex'>
      <button
        class='cursor-pointer hover:bg-green-100 touch:active:bg-green-100 hover:text-gray-800 touch:active:text-gray-800 transition-colors bg-green-50 border border-green-200 text-green-700 rounded w-full h-full flex items-center justify-center text-sm gap-3'
        onClick={selectAll}
      >
        <Icon class='size-5'>
          <IconCheckbox checked />
        </Icon>
        Todos
      </button>
      <button
        class='cursor-pointer hover:bg-red-100 touch:active:bg-red-100 hover:text-gray-800 touch:active:text-gray-800 transition-colors bg-red-50 border border-red-200 text-red-700 rounded w-full h-full flex items-center justify-center text-sm gap-3'
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
