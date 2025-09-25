import type { TripDetailDatePicker, TripDetailInputNumber, TripDetailSelect } from '@/env'
import { tripDetails } from '@/lib/custom-trips'

export function TripDetails () {
  return (
    <main class='grid md:grid-cols-2 grid-cols-1 gap-4'>
      {
        tripDetails.map((detail) => {
          if (detail.type === 'select') {
            return <TripDetailSelect key={`trip-detail-select-${detail.id}`} detail={detail} />
          } else if (detail.type === 'date-picker') {
            return <TripDetailDatePicker key={`trip-detail-date-picker-${detail.id}`} detail={detail} />
          } else if (detail.type === 'number') {
            return <TripDetailNumber key={`trip-detail-number-${detail.id}`} detail={detail} />
          }
        })
      }
    </main>
  )
}

function TripDetailSelect ({ detail: { id: detailId, options, title, defaultOption } }: { detail: TripDetailSelect }) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300'>
      <h1 class='dark:text-gray-100 font-semibold text-sm'>{title}</h1>
      <select class='h-fit p-2 text-sm rounded border transition-colors border-gray-200 group-hover:border-gray-300 dark:border-0 dark:bg-gray-700/50 dark:outline-0 dark:group-hover:bg-gray-700 dark:touch:active:bg-gray-700'>
        <option selected value='default' disabled>{defaultOption}</option>
        { options.map(({ id, name }) => (
            <option key={`trip-detail-select-${detailId}-option-${id}`}>
              {name}
            </option>
        )) }
      </select>
    </label>
  )
}

export function TripDetailDatePicker ({ detail: { title } }: { detail: TripDetailDatePicker }) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300 group'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold text-sm'>{title}</h1>
      <input
        type='date'
        class='w-full h-fit p-2.5 text-sm rounded border cursor-pointer transition-colors border-gray-200 group-hover:border-gray-300 dark:border-0 dark:bg-gray-700/50 dark:outline-0 dark:group-hover:bg-gray-700 dark:touch:active:bg-gray-700'
      />
    </label>
  )
}

export function TripDetailNumber ({ detail: { title } }: { detail: TripDetailInputNumber }) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300 group'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold text-sm'>{title}</h1>
      <input
        type='number'
        placeholder='Ejemplo: 45'
        class='w-full h-fit p-2.5 text-sm rounded border cursor-pointer transition-colors border-gray-200 group-hover:border-gray-300 dark:border-0 dark:bg-gray-700/50 dark:outline-0 dark:group-hover:bg-gray-700 dark:touch:active:bg-gray-700'
      />
    </label>
  )
}
