export function RegisterButton ({ class: className = '' }: { class?: string }) {
  return (
    <a class={`text-nowrap rounded-lg p-2 px-4 hover:bg-orange-600 touch:active:bg-orange-600 bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700 dark:touch:active:bg-orange-700 text-white transition-colors cursor-pointer ${className}`}>
      Registrarse
    </a>
  )
}
