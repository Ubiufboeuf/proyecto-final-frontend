import { tripDetails } from '@/lib/custom-trips'
import { FormSelect } from '../forms/Select'
import { FormDatePicker } from '../forms/DatePicker'
import { FormTimePicker } from '../forms/TimePicker'
import { FormInput } from '../forms/Input'

export function TripDetails () {
  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        tripDetails.map((detail) => {
          if (detail.type === 'select') {
            return <FormSelect key={`trip-detail-select-${detail.id}`} detail={detail} />
          } else if (detail.type === 'date-picker') {
            return <FormDatePicker key={`trip-detail-date-picker-${detail.id}`} detail={detail} />
          } else if (detail.type === 'time-picker') {
            return <FormTimePicker key={`trip-detail-time-picker-${detail.id}`} detail={detail} />
          } else if (detail.type === 'number') {
            return <FormInput key={`trip-detail-number-${detail.id}`} detail={detail} />
          }
        })
      }
    </main>
  )
}
