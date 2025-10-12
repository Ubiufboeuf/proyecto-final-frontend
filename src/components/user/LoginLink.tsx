export function LoginLink ({ class: className = '' }: { class?: string }) {
  return (
    <a href='/login/' class={`text-nowrap rounded-lg p-2 px-4 hover:bg-orange-50 dark:hover:bg-gray-700 touch:active:bg-orange-50 dark:touch:active:bg-gray-700 text-orange-500 hover:text-gray-800 dark:hover:text-orange-50 dark:touch:active:text-orange-50 touch:active:text-gray-800 transition-colors border-orange-500 dark:hover:border-orange-50 dark:touch:active:border-orange-50 border cursor-pointer ${className}`}>
      Iniciar Sesión
    </a>
  )
}
