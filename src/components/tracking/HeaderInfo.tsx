import type { BusesData } from '@/env'
import { parseTimestamp } from '@/lib/utils'
import { useBusesStore } from '@/stores/useBusesStore'
import { useEffect, useState } from 'preact/hooks'
import { Temporal } from 'temporal-polyfill'

export function HeaderInfo ({ busesData }: { busesData: BusesData }) {
  const [timestampInMiliseconds, setTimestamp] = useState<number>(0)
  const selectedCount = useBusesStore((state) => state.selectedCount)

  useEffect(() => {
    setTimestamp(getTimestamp())

    const intervalId = setInterval(() => {
      setTimestamp(getTimestamp())
    }, 1000) // esto habría que cambiarlo por websockets

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  function getTimestamp () {
    // const instant = Temporal.Instant.fromEpochMilliseconds(timestamp)
    // console.log(instant.epochMilliseconds)
    // return instant.epochMilliseconds
    return Temporal.Now.instant().epochMilliseconds
  }
  
  return (
    <section class='flex items-center justify-center w-fit h-fit max-h-full p-3 gap-3'>
      <span class={`
        ${busesData.count ? 'hasBuses' : ''} [&.hasBuses]:text-blue-700 [&.hasBuses]:bg-blue-100 [&.hasBuses]:border-blue-300 text-gray-700 bg-gray-100 border-gray-300
         rounded-full text-xs p-2 px-4 font-semibold border w-fit text-center`}>
        { selectedCount }
        <span class='not-sm:hidden'> ómnibus</span>
        <span class='not-xxs:hidden'>{ selectedCount === 1 ? ' seleccionado' : ' seleccionados' }</span>
        <span class='xxs:hidden'>/{busesData.count}</span>
      </span>
      <div class='text-sm text-gray-600 w-fit text-nowrap'>
        <span class='not-xs:hidden'>
          Actualizado:
        </span>
        <span>{' '}{ parseTimestamp(timestampInMiliseconds, { format: '12 hrs', output: 'time' }) }</span>
      </div>
    </section>
  )
}
