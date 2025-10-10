import type { FormTextarea } from '@/env'

export function FormTextarea ({ id, placeholder, title }: FormTextarea) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300 group col-start-1 md:col-end-3'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold sm:text-sm'>{title}</h1>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        class='w-full h-fit min-h-[6lh] max-h-[12lh] field-sizing-content p-3 px-3.5 sm:text-sm resize-none flex items-center justify-between gap-2 cursor-text rounded border-2 transition-colors border-gray-200 group-hover:border-orange-500/50 dark:bg-gray-700/50 outline-0 touch:group-active:border-orange-500/50 focus-within:bg-gray-100 dark:border-transparent dark:group-hover:border-gray-600 dark:touch:active:border-gray-600 dark:focus-within:bg-gray-800'
      />
    </label>
  )
}
