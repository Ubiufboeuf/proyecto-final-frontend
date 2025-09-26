import type { FormInput } from '@/env'

export function FormInput ({ detail: { title, id, placeholder, type } }: { detail: FormInput }) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300 group'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold sm:text-sm'>{title}</h1>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        class='w-full h-fit p-2.5 sm:text-sm rounded border cursor-pointer transition-colors border-gray-200 group-hover:border-gray-300 dark:border-0 dark:bg-gray-700/50 dark:outline-0 dark:group-hover:bg-gray-700 dark:touch:active:bg-gray-700'
      />
    </label>
  )
}
