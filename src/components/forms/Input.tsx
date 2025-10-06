import type { FormInput } from '@/env'
import { Icon } from '../Icon'
import { IconEye, IconEyeClosed } from '../Icons'
import { useState, type HTMLInputTypeAttribute } from 'preact/compat'

export function FormInput ({ id, name, title, placeholder, type, class: className }: { id: string, name: string, title: string, type: HTMLInputTypeAttribute, placeholder: string, class: string }) {
  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword () {
    setShowPassword((prevState) => !prevState)
  }
  
  return (
    <label class='relative flex flex-col gap-1 dark:text-gray-300 group'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold sm:text-sm'>{title}</h1>
      <div class={`${className} ${type === 'password' ? '' : 'input-password'} flex items-center justify-between gap-2 p-2.5 not-[.input-password]:pr-1 not-[.input-password]:py-1 w-full h-fit not-[[class*=title-]]:sm:text-sm rounded border-2 transition-colors border-gray-200 group-hover:border-orange-500/50 dark:border-transparent dark:bg-gray-700/50 dark:outline-0 dark:group-hover:border-gray-600 dark:touch:active:bg-gray-700 dark:has-[input:focus-visible]:bg-gray-800`}>
        <input
          id={id}
          name={name}
          type={type !== 'password' ? type : showPassword ? 'text' : type}
          placeholder={placeholder}
          class='h-full w-full outline-0 text-ellipsis'
        />
        { type === 'password' && (
          <label
            onInput={toggleShowPassword}
            class='flex items-center justify-center h-fit w-fit p-1 cursor-pointer rounded-lg transition-all hover:bg-gray-600'
          >
            <input type='checkbox' hidden />
            <Icon class='size-6' hidden={showPassword}>
              <IconEye />
            </Icon>
            <Icon class='size-6' hidden={!showPassword}>
              <IconEyeClosed />
            </Icon>
          </label>
        ) }
      </div>
    </label>
  )
}
