import type { FormTextarea } from '@/env'

export function FormTextarea ({ id, name, placeholder, title, class: className, required }: FormTextarea) {
  return (
    <label class='flex flex-col gap-1 dark:text-gray-300 group col-start-1 md:col-end-3'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold sm:text-sm'>{title}</h1>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        class={`${className} flex items-center justify-between gap-2 w-full h-fit min-h-[6lh] max-h-[12lh] field-sizing-content resize-none p-3 px-3.5 not-[[class*=text-]]:sm:text-sm rounded border-2 transition-colors border-gray-200 hover:bg-orange-50 focus-within:hover:bg-gray-100 dark:hover:bg-gray-700/50 dark:focus-within:hover:bg-gray-800 hover:border-orange-500/50 touch:group-active:border-orange-500/50 focus-within:bg-gray-100 dark:border-transparent dark:bg-gray-700/50 dark:outline-0 dark:hover:border-gray-600 dark:touch:active:border-gray-600 dark:focus-within:bg-gray-800 cursor-text`}
        required={required}
      />
    </label>
  )
}
