import { ENDPOINTS } from '@/lib/constants'
import { FormInput } from './Input'
import { SwapInputs } from './SwapInputs'
import { useState } from 'preact/hooks'
import { errorHandler } from '@/lib/utils'

export function RegisterForm () {
  const [isSwapped, setIsSwapped] = useState(false)
  
  async function handleSubmitForm (event: SubmitEvent) {
    event.preventDefault()

    const form = event.currentTarget
    if (!(form instanceof HTMLFormElement)) return
    
    const formData = new FormData(form)

    const fullname = formData.get('input-register-fullname')
    const document = formData.get('input-register-document')
    const email = formData.get('input-register-email')
    const phone = formData.get('input-register-phone')
    const password = formData.get('input-register-password')

    if (!fullname) {
      console.error('Falta especificar el nombre completo')
      return
    }

    if (!document) {
      console.error('Falta especificar el documento (cédula o dni)')
      return
    }

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
      fullname,
      document,
      email,
      phone,
      contact,
      password
    }

    try {
      const res = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include'
      })

      if (!res.ok) {
        // console.error('Error registrando la cuenta')
        alert('Error registrando la cuenta')
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
          errorHandler(null, 'Error parseando la respuesta al registrarse')
          // console.log('php data as text:', text)
          return
        } catch (err) {
          errorHandler(err, 'Error mostrando la respuesta del servidor al registrarse')
          return
        }
      }

      // console.log('php data as json:', data)
      if (data.message) alert(data.message)
      if (data.success) location.href = '/'
    } catch {
      // console.error('Error de red al registrarse')
      alert('Error de red al registrarse')
    }
  }

  function handleSwap (isSwapped: boolean) {
    setIsSwapped(isSwapped)
  }
  
  return (
    <form
      class='h-fit w-100 rounded-xl flex flex-col items-center gap-4 p-4 py-12 border border-gray-300 bg-white dark:border-0 dark:bg-gray-700/50'
      onSubmit={handleSubmitForm}
    >
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold text-xl'>Crea una cuenta</h1>
        <div class='w-full lfw:px-6'>
          <FormInput
            id='input-register-fullname'
            name='input-register-fullname'
            title='Nombre Completo'
            placeholder='Pepito Martinez'
            type='text'
            class='text-base'
            required
          />
        </div>
        <div class='w-full lfw:px-6'>
          <FormInput
            id='input-register-document'
            name='input-register-document'
            title='Documento (Cédula o DNI)'
            placeholder='12345678R'
            type='text'
            class='text-base'
            required
          />
        </div>
        <div class='w-full lfw:px-6'>
          <SwapInputs label='Teléfono' swap_label='Correo' onSwap={handleSwap}>
            <FormInput
              id='input-register-email'
              name='input-register-email'
              title='Correo'
              placeholder='correo@email.com'
              type='email'
              class='text-base'
              disabled={isSwapped}
              required
            />
            <FormInput
              id='input-register-phone'
              name='input-register-phone'
              title='Teléfono'
              placeholder='+000 123 456 789'
              type='tel'
              class='text-base'
              disabled={!isSwapped}
              required
            />
          </SwapInputs>
        </div>
        <div class='w-full lfw:px-6'>
          <FormInput
            id='input-register-password'
            name='input-register-password'
            title='Contraseña'
            placeholder='••••••••'
            visiblePasswordPlaceholder='123456'
            type='password'
            minLength={6}
            class='text-base'
            required
          />
        </div>
      <button class='text-nowrap rounded-lg mt-4 p-2 px-4 hover:bg-orange-600 touch:active:bg-orange-600 bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-600/80 dark:touch:active:bg-orange-600/80 text-white transition-colors cursor-pointer'>
        Crear cuenta
      </button>
      <div class='flex flex-col items-center mt-6'>
        <p class='text-gray-600 dark:text-gray-300 text-center'>¿Ya tienes una cuenta?</p>
        <a
          href='/login/'
          class='transition-colors underline decoration-2 underline-offset-2 text-blue-500 dark:text-blue-400 decoration-transparent hover:decoration-[unset] touch:active:decoration-[unset]'
        >
          Inicia sesión
        </a>
      </div>
    </form>
  )
}
