import type { TripTypeId } from '@/env'
import { tripTypes } from '@/lib/custom-trips'
import { useCustomTripPreferences } from '@/stores/useCustomTripPreferencesStore'
import { useEffect } from 'preact/hooks'

export function TripTypes () {
  const setTripTypeById = useCustomTripPreferences((state) => state.setTripTypeById)
  
  const handleChange = (id: TripTypeId) => () => changeTripType(id)

  function changeTripType (id: TripTypeId) {
    setTripTypeById(id)
  }

  function isValidTripTypeId (id: unknown): id is TripTypeId {
    if (typeof id === 'string') return tripTypes.some((t) => t.id === id)
    else return false
  }

  function loadTripType () {
    const tripTypeElement = document.querySelector('.tripTypeElement:has(:checked)')
    if (tripTypeElement && tripTypeElement instanceof HTMLElement) {
      const { id } = tripTypeElement.dataset
      if (id && isValidTripTypeId(id)) changeTripType(id)
    }
  }

  useEffect(() => {
    loadTripType()
  }, [])

  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        tripTypes.map(({ id, title, description }) => (
          <label
            key={`trip-type-${id}`}
            class='tripTypeElement flex flex-col h-full justify-center w-full border-2 rounded-lg p-4 border-gray-200 dark:border-0 text-gray-600 dark:text-gray-300 dark:bg-gray-700/50 cursor-pointer transition-all hover:border-orange-500/50 has-checked:border-orange-400 has-checked:bg-orange-100 dark:has-checked:bg-gray-600 dark:hover:bg-gray-600/70 dark:has-checked:hover:bg-gray-600/70 dark:touch:active:bg-gray-600/70'
            onChange={handleChange(id)}
            data-id={id}
          >
            <input type='radio' name='inputTripType' hidden />
            <strong class='text-gray-700 dark:text-gray-200'>{title}</strong>
            <span class='text-sm'>{description}</span>
          </label>
        ))
      }
    </main>
  )
}
