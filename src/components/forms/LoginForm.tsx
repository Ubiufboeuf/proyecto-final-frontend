import { ENDPOINTS } from '@/lib/constants'
import { FormInput } from './Input'
import { SwapInputs } from './SwapInputs'
import { useState } from 'preact/hooks'
import { errorHandler } from '@/lib/utils'

export function LoginForm () {
  const [isSwapped, setIsSwapped] = useState(false)
  
  async function handleSubmitForm (event: SubmitEvent) {
    event.preventDefault()

    const form = event.currentTarget
    if (!(form instanceof HTMLFormElement)) return
    
    const formData = new FormData(form)
    const email = formData.get('input-login-email')
    const phone = formData.get('input-login-phone')
    const password = formData.get('input-login-password')

    if (!email && !isSwapped) {
      console.error('Falta especificar el email')
      return
    }

    if (!phone && isSwapped) {
      console.error('Falta especificar el teléfono')
      return
    }

    if (!password) {
      console.error('Falta especificar la contraseña')
      return
    }

    const contact = isSwapped ? 'phone' : 'email'

    const body = {
      email,
      phone,
      contact,
      password
    }

    try {
      const res = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        alert('Error iniciando sesión')
        return
      }
      
      let text = ''
      let data = null
      let errorParsingJSON: unknown | false = false

      try {
        text = await res.text()
        data = JSON.parse(text)
      } catch (err) {
        errorParsingJSON = err
      }

      if (errorParsingJSON !== false) {
        try {
          errorHandler(null, 'Error parseando la respuesta al iniciar sesión')
          // console.log('php data as text:', text)
          return
        } catch (err) {
          errorHandler(err, 'Error mostrando la respuesta del servidor al iniciar sesión')
          return
        }
      }

      // console.log('php data as json:', data)
      if (data.message) alert(data.message)
      if (data.success) location.href = '/'
    } catch {
      alert('Error de red al iniciar sesión')
    }
  }
  
  return (
    <form
      class='h-fit w-100 rounded-xl flex flex-col items-center gap-4 p-4 py-12 border border-gray-300 bg-white dark:border-0 dark:bg-gray-700/50'
      onSubmit={handleSubmitForm}
    >
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold text-xl'>Iniciar Sesión</h1>
      <div class='w-full lfw:px-6'>
        <SwapInputs label='Teléfono' swap_label='Correo' onSwap={setIsSwapped}>
          <FormInput
            id='input-login-email'
            name='input-login-email'
            title='Correo'
            placeholder='correo@email.com'
            type='email'
            class='text-base'
            disabled={isSwapped}
            required
          />
          <FormInput
            id='input-login-phone'
            name='input-login-phone'
            title='Teléfono'
            placeholder='+000 123 456 789'
            type='tel'
            class='text-base'
            wrapperClass='w-full max-w-full'
            disabled={!isSwapped}
            required
          />
        </SwapInputs>
      </div>
      <div class='w-full lfw:px-6'>
        <FormInput
          id='input-login-password'
          name='input-login-password'
          title='Contraseña'
          placeholder='••••••••'
          visiblePasswordPlaceholder='123456'
          type='password'
          class='text-base'
          required
        />
      </div>
      <button class='text-nowrap rounded-lg mt-4 p-2 px-4 hover:bg-orange-600 touch:active:bg-orange-600 bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-600/80 dark:touch:active:bg-orange-600/80 text-white transition-colors cursor-pointer'>
        Iniciar Sesión
      </button>
      <div class='flex flex-col items-center mt-6'>
        <p class='text-gray-600 dark:text-gray-300 text-center'>¿No tienes una cuenta todavía?</p>
        <a
          href='/register/'
          class='transition-colors underline decoration-2 underline-offset-2 text-blue-500 dark:text-blue-400 decoration-transparent hover:decoration-[unset] touch:active:decoration-[unset]'
        >
          Registrate
        </a>
      </div>
    </form>
  )
}
