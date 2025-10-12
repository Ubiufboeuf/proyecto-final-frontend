export function RegisterLink ({ class: className = '' }: { class?: string }) {
  return (
    <a href='/register/' class={`text-nowrap rounded-lg p-2 px-4 hover:bg-orange-600 touch:active:bg-orange-600 bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-600/80 dark:touch:active:bg-orange-600/80 text-white transition-colors cursor-pointer ${className}`}>
      Registrarse
    </a>
  )
}
