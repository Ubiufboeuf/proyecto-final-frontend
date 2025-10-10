import { tripInfo } from '@/lib/custom-trips'
import { FormTextarea } from '../forms/Textarea'
import { FormInput } from '../forms/Input'

export function TripInfo () {
  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        tripInfo.map((detail) => {
          if (detail.formElementType === 'textarea') {
            return <FormTextarea
              key={`trip-detail-select-${detail.id}`}
              {...detail}
            />
          } else if (detail.formElementType === 'input') {
            return <FormInput
              key={`trip-detail-input-${detail.id}`}
              {...detail}
            />
          }
        })
      }
    </main>
  )
}
