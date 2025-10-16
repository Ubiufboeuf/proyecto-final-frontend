import { FormInput } from './Input'
import { SwapInputs } from './SwapInputs'

export function RegisterForm () {
  function handleSubmitForm (event: SubmitEvent) {
    event.preventDefault()
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
              required
            />
            <FormInput
              id='input-register-phone'
              name='input-register-phone'
              title='Teléfono'
              placeholder='+000 123 456 789'
              type='tel'
              class='text-base'
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
