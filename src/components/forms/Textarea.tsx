import type { FormTextarea } from '@/env'

export function FormTextarea ({ detail: { id, placeholder, title } }: { detail: FormTextarea }) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300 group col-start-1 md:col-end-3'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold sm:text-sm'>{title}</h1>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        class='w-full h-fit min-h-[6lh] max-h-[12lh] field-sizing-content p-3 px-3.5 sm:text-sm rounded border-2 resize-none cursor-pointer transition-colors border-gray-200 group-hover:border-orange-500/50 dark:border-0 dark:bg-gray-700/50 dark:outline-0 dark:group-hover:bg-gray-700 dark:touch:active:bg-gray-700 dark:focus-visible:bg-gray-800 dark:focus-visible:hover:bg-gray-700'
      />
    </label>
  )
}
