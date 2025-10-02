import type { FormTimePicker } from '@/env'

export function FormTimePicker ({ detail: { title, id } }: { detail: FormTimePicker }) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300 group'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold sm:text-sm'>{title}</h1>
      <input
        id={id}
        name={id}
        type='time'
        class='w-full h-fit p-2.5 sm:text-sm rounded border-2 cursor-pointer transition-colors border-gray-200 group-hover:border-orange-500/50 dark:border-0 dark:bg-gray-700/50 dark:outline-0 dark:group-hover:bg-gray-700 dark:touch:active:bg-gray-700 dark:focus-visible:bg-gray-800 dark:focus-visible:hover:bg-gray-700'
      />
    </label>
  )
}
