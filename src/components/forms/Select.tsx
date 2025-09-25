import type { FormSelect } from '@/env'

export function FormSelect ({ detail: { id: tripDetailId, options, title, defaultOption } }: { detail: FormSelect }) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300 group'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold sm:text-sm'>{title}</h1>
      <select
        id={tripDetailId}
        name={tripDetailId}
        class='w-full h-fit p-2.5 sm:text-sm rounded border cursor-pointer transition-colors border-gray-200 group-hover:border-gray-300 dark:border-0 dark:bg-gray-700/50 dark:outline-0 dark:group-hover:bg-gray-700 dark:touch:active:bg-gray-700'
      >
        <option selected value='default' disabled>{defaultOption}</option>
        { options.map(({ id, name }) => (
            <option key={`trip-detail-select-${tripDetailId}-option-${id}`}>
              {name}
            </option>
        )) }
      </select>
    </label>
  )
}
