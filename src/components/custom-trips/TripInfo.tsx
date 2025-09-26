import { tripInfo } from '@/lib/custom-trips'
import { FormTextarea } from '../forms/Textarea'
import { FormInput } from '../forms/Input'

export function TripInfo () {
  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        tripInfo.map((detail) => {
          if (detail.type === 'textarea') {
            return <FormTextarea key={`trip-detail-select-${detail.id}`} detail={detail} />
          } else if (detail.type === 'email') {
            return <FormInput key={`trip-detail-input-${detail.id}`} detail={detail} />
          } else if (detail.type === 'tel') {
            return <FormInput key={`trip-detail-input-${detail.id}`} detail={detail} />
          } else if (detail.type === 'text') {
            return <FormInput key={`trip-detail-input-${detail.id}`} detail={detail} />
          }
        })
      }
    </main>
  )
}
