import type { FormInput } from '@/env'
import { Icon } from '../Icon'
import { IconEye, IconEyeClosed } from '../Icons'
import { useRef, useState } from 'preact/compat'

export function FormInput ({
  /* Identificadores */ id, name,
  /* Del elemento    */ title, type, placeholder, required = false, autocomplete = '',
  /* Del componente  */ class: className, visiblePasswordPlaceholder = 'abc123'
}: FormInput) {
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function toggleShowPassword () {
    const input = inputRef.current
    if (input) {
      // Establecer foco en el input
      setTimeout(() => input.focus(), 0)
    }

    setShowPassword((prevState) => { // prevState = showPassword, true o false
      const mostrarContraseña = !prevState
      // Debo usar !prevState porque es el que termina usando la UI como nuevo valor, así no queda desactualizado

      if (input && type === 'password') input.placeholder = mostrarContraseña ? visiblePasswordPlaceholder : placeholder

      return !prevState
    })
  }

  function handleFocusInput () {
    const input = inputRef.current
    if (input?.type === 'password') {
      input.selectionStart = input.value.length
      input.selectionEnd = input.value.length
    }
  }
  
  return (
    <label class='relative flex flex-col gap-1 text-gray-700 dark:text-gray-300 group'>
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold sm:text-sm'>{title}</h1>
      <div class={`${className} ${type === 'password' ? '' : 'input-password'} flex items-center justify-between gap-2 p-2.5 not-[.input-password]:pr-1 not-[.input-password]:py-1 w-full h-fit not-[[class*=title-]]:sm:text-sm rounded border-2 transition-colors border-gray-200 group-hover:border-orange-500/50 touch:group-active:border-orange-500/50 focus-within:bg-gray-100 dark:border-transparent dark:bg-gray-700/50 dark:outline-0 dark:group-hover:border-gray-600 dark:touch:active:border-gray-600 dark:focus-within:bg-gray-800 cursor-text`}>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type !== 'password' ? type : showPassword ? 'text' : type}
          placeholder={placeholder}
          onFocus={handleFocusInput}
          class='h-full w-full outline-0 text-ellipsis'
          required={required}
          autocomplete={autocomplete}
        />
        { type === 'password' && (
          <label
            onInput={toggleShowPassword}
            class='flex items-center justify-center h-fit w-fit p-1 cursor-pointer rounded-lg transition-all hover:bg-gray-300 touch:active:bg-gray-300 dark:hover:bg-gray-600 dark:touch:active:bg-gray-600'
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
