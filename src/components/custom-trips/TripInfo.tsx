import { tripInfo } from '@/lib/custom-trips'
import { FormTextarea } from '../forms/Textarea'

export function TripInfo () {
  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        tripInfo.map((detail) => {
          if (detail.type === 'textarea') {
            return <FormTextarea key={`trip-detail-select-${detail.id}`} detail={detail} />
          }
        })
      }
    </main>
  )
}
