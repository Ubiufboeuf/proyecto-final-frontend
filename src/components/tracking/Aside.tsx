import { useEffect, useState } from 'preact/hooks'
import { useBusesStore } from '@/stores/useBusesStore'
import { AsideHeader } from '@/components/tracking/AsideHeader'
import type { BusesData } from '@/env'
import { BusCard } from './BusCard'
import { useId } from 'preact/hooks'
import { useTrackUIStore } from '@/stores/useTrackUIStore'

export function Aside ({ busesData: _busesData, class: className }: { busesData: BusesData | null, class: string }) {
  const [busesData, setBusesData] = useState(_busesData)
  const buses = useBusesStore((state) => state.buses)
  const setSelectedCount = useBusesStore((state) => state.setSelectedCount)
  const delayed = useBusesStore((state) => state.delayed)
  const inTerminal = useBusesStore((state) => state.inTerminal)
  const inMovement = useBusesStore((state) => state.inMovement)
  const isUIVisible = useTrackUIStore((state) => state.isUIVisible)

  useEffect(() => {
    if (!buses) return

    let selected = 0
    for (const bus of buses) {
      if (bus.selected) {
        selected++
      }
    }
    setSelectedCount(selected)

    const newBusesData: BusesData = {
      ...busesData,
      buses: buses,
      selectedCount: selected || 0
    }
    setBusesData(newBusesData)
  }, [buses])

  return (
    <aside class={className} hidden={!isUIVisible}>
      <AsideHeader />
      <section class='relative overflow-y-scroll h-full max-h-full [scrollbar-width:thin]'>
        <div id='buses-cards-wrapper' class='p-4 h-fit min-h-fit grid grid-cols-1 gap-4'>
          {
            buses?.map((bus) => (
              <BusCard key={useId()} bus={bus} />
            ))
          }
        </div>
        <footer class='sticky bottom-0 bg-white min-h-fit border-t border-gray-200 text-gray-700 dark:border-0 dark:bg-gray-800 dark:text-gray-200 p-2 px-4 flex flex-col gap-1'>
          <strong class='text-xs font-semibold my-1'>Estado de los ómnibus:</strong>
          <div class='flex items-center h-fit w-full justify-between'>
            <span class='text-xs flex items-center gap-2'>
              <div class='size-2 rounded-full bg-green-500 dark:bg-green-700' />
              En viaje
              <span class={`${inMovement ? '' : 'neutral'} ml-auto font-semibold [&.neutral]:text-gray-700 dark:[&.neutral]:text-gray-500 text-green-700 dark:text-green-600`}>{inMovement ?? 0}</span>
            </span>
            <span class='text-xs flex items-center gap-2'>
              <div class='size-2 rounded-full bg-blue-500 dark:bg-blue-700' />
              En terminal
              <span class={`${inTerminal ? '' : 'neutral'} ml-auto font-semibold [&.neutral]:text-gray-700 dark:[&.neutral]:text-gray-500 text-blue-700 dark:text-blue-600`}>{inTerminal ?? 0}</span>
            </span>
            <span class='text-xs flex items-center gap-2'>
              <div class='size-2 rounded-full bg-red-500 dark:bg-red-700' />
              Atrasado
              <span class={`${delayed ? '' : 'neutral'} ml-auto font-semibold [&.neutral]:text-gray-700 dark:[&.neutral]:text-gray-500 text-red-700 dark:text-red-600`}>{delayed ?? 0}</span>
            </span>
          </div>
        </footer>
      </section>
    </aside>
  )
}
