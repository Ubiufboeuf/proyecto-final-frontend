import { ENDPOINTS } from '@/lib/constants'
import { FormInput } from './Input'

export function LoginForm () {
  async function handleSubmitForm (event: SubmitEvent) {
    event.preventDefault()

    const form = event.currentTarget
    if (!(form instanceof HTMLFormElement)) return
    
    const formData = new FormData(form)
    const email = formData.get('input-login-email')
    const password = formData.get('input-login-password')

    if (!email) {
      console.error('Falta especificar el email')
      return
    }

    if (!password) {
      console.error('Falta especificar la contraseña')
      return
    }

    try {
      const res = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        location.href = '/'
        // console.log(res)
        return
      }
      
      console.error('Error iniciar la sesión')
    } catch {
      console.error('Error de red al iniciar sesión')
    }
  }
  
  return (
    <form
      class='h-fit w-100 rounded-xl flex flex-col items-center gap-4 p-4 py-12 border border-gray-300 bg-white dark:border-0 dark:bg-gray-700/50'
      onSubmit={handleSubmitForm}
    >
      <h1 class='text-gray-800 dark:text-gray-100 font-semibold text-xl'>Iniciar Sesión</h1>
      <div class='w-full lfw:px-6'>
        <FormInput
          id='input-login-email'
          name='input-login-email'
          title='Correo'
          placeholder='correo@email.com'
          type='email'
          class='text-base'
          required
        />
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
