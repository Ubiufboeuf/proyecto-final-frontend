import { useEffect, useState } from 'preact/hooks'
import { useBusesStore } from '@/stores/useBusesStore'
import { AsideHeader } from '@/components/tracking/AsideHeader'
import type { Buses } from '@/env'
import { BusCard } from './BusCard'
import { useId } from 'preact/hooks'

export function Aside ({ buses: _buses }: { buses: Buses | null }) {
  const [buses, setBuses] = useState(_buses)
  const busesData = useBusesStore((state) => state.busesData)
  const setSelectedCount = useBusesStore((state) => state.setSelectedCount)
  const delayed = useBusesStore((state) => state.delayed)
  const inTerminal = useBusesStore((state) => state.inTerminal)
  const inMovement = useBusesStore((state) => state.inMovement)

  useEffect(() => {
    let selected = 0
    for (const bus of busesData) {
      if (bus.selected) {
        selected++
      }
    }
    setSelectedCount(selected)

    const newBuses: Buses = {
      ...buses,
      busesData,
      selectedCount: selected || 0
    }
    setBuses(newBuses)
  }, [busesData])

  return (
    <aside class='relative lg:left-0 -left-80 top-0 z-10 flex flex-col justify-between h-[calc(100%-64px)] max-h-[calc(100%-64px)] overflow-hidden w-80 border-r border-gray-200 bg-white [transition:left_250ms_ease]'>
      <AsideHeader />
      <section class='p-4 overflow-y-auto [scrollbar-width:thin] h-full flex flex-col gap-4'>
        {
          busesData.map((bus) => (
            <BusCard key={useId()} info={bus} />
          ))
        }
      </section>
      <legend class='min-h-fit border-t border-gray-200 text-gray-700 p-2 px-4 flex flex-col gap-1'>
        <strong class='text-xs font-semibold my-1'>Estado de los ómnibus:</strong>
        <span class='text-xs flex items-center gap-2'>
          <div class='size-2 rounded-full bg-green-500' />
          En viaje
          <span class={`${inMovement ? '' : 'neutral'} ml-auto font-semibold [&.neutral]:text-gray-700 text-green-700`}>{inMovement ?? 0}</span>
        </span>
        <span class='text-xs flex items-center gap-2'>
          <div class='size-2 rounded-full bg-blue-500' />
          En terminal
          <span class={`${inTerminal ? '' : 'neutral'} ml-auto font-semibold [&.neutral]:text-gray-700 text-blue-700`}>{inTerminal ?? 0}</span>
        </span>
        <span class='text-xs flex items-center gap-2'>
          <div class='size-2 rounded-full bg-red-500' />
          Atrasado
          <span class={`${delayed ? '' : 'neutral'} ml-auto font-semibold [&.neutral]:text-gray-700 text-red-700`}>{delayed ?? 0}</span>
        </span>
      </legend>
    </aside>
  )
}
