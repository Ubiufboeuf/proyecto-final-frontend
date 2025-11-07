import { tripDetails } from '@/lib/custom-trips'
import { FormSelect } from '../forms/Select'
import { FormDatePicker } from '../forms/DatePicker'
import { FormTimePicker } from '../forms/TimePicker'
import { FormInput } from '../forms/Input'
import { useCustomTripPreferences } from '@/stores/useCustomTripPreferencesStore'

export function TripDetails () {
  const capacity = useCustomTripPreferences((state) => state.capacity)

  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        tripDetails.map((detail) => {
          if (detail.formElementType === 'select') {
            return <FormSelect
              key={`trip-detail-select-${detail.id}`}
              detail={detail}
            />
          } else if (detail.formElementType === 'date-picker') {
            return <FormDatePicker
              key={`trip-detail-date-picker-${detail.id}`}
              detail={detail}
            />
          } else if (detail.formElementType === 'time-picker') {
            return <FormTimePicker
              key={`trip-detail-time-picker-${detail.id}`}
              detail={detail}
            />
          } else {
            const { id, name, placeholder, title, type } = detail
            return <FormInput
              key={`trip-detail-number-${detail.id}`}
              id={id}
              name={name}
              placeholder={placeholder}
              type={type}
              title={title}
              min={1}
              max={capacity > 0 ? capacity : undefined}
            />
          }
        })
      }
    </main>
  )
}
