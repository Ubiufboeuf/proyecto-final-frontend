import { typesOfBuses } from '@/lib/custom-trips'
import { SelectableBusTypeLight } from '@/components/custom-trips/SelectableBusTypeLight'
import { SelectableBusTypeDark } from '@/components/custom-trips/SelectableBusTypeDark'
import { useCustomTripPreferences } from '@/stores/useCustomTripPreferencesStore'

export function TypesOfBuses () {
  const setCapacity = useCustomTripPreferences((state) => state.setCapacity)

  function updateBusCapacity (type: string | undefined) {
    
  }

  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        typesOfBuses.map((busType) => <>
          <SelectableBusTypeLight busType={busType} updateBusCapacity={updateBusCapacity} />
          <SelectableBusTypeDark busType={busType} updateBusCapacity={updateBusCapacity} />
        </>)
      }
    </main>
  )
}
