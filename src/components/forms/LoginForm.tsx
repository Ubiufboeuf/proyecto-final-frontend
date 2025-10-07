import { FormInput } from './Input'

export function LoginForm () {
  return (
    <form class='h-fit w-100 rounded-xl flex flex-col items-center gap-4 p-4 py-12 bg-gray-700/50'>
      <h1 class='text-gray-100 font-semibold text-xl'>Iniciar Sesión</h1>
      <div class='w-full px-6'>
        <FormInput
          id='input-register-password'
          name='input-register-password'
          title='Correo'
          placeholder='correo@email.com'
          type='text'
          class='text-base'
        />
      </div>
      <div class='w-full px-6'>
        <FormInput
          id='input-login-password'
          name='input-login-password'
          title='Contraseña'
          placeholder='••••••••'
          type='password'
          class='text-base'
        />
      </div>
      <div class='flex flex-col items-center mt-8'>
        <p class='text-gray-300'>¿No tienes una cuenta todavía?</p>
        <a
          href='/register/'
          class='transition-colors underline decoration-2 underline-offset-2 text-blue-400 decoration-transparent hover:decoration-[unset] touch:active:decoration-[unset]'
        >
          Registrate
        </a>
      </div>
      <button class='text-nowrap rounded-lg p-2 px-4 hover:bg-orange-600 touch:active:bg-orange-600 bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-600/80 dark:touch:active:bg-orange-600/80 text-white transition-colors cursor-pointer'>
        Iniciar Sesión
      </button>
    </form>
  )
}
