import { typesOfBuses } from '@/lib/custom-trips'
import { SelectableBusTypeLight } from '@/components/custom-trips/SelectableBusTypeLight'
import { SelectableBusTypeDark } from '@/components/custom-trips/SelectableBusTypeDark'

export function TypesOfBuses () {
  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        typesOfBuses.map((busType) => <>
          <SelectableBusTypeLight busType={busType} />
          <SelectableBusTypeDark busType={busType} />
        </>)
      }
    </main>
  )
}
