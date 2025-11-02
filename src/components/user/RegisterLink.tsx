export function RegisterLink ({ class: className = '' }: { class?: string }) {
  return (
    <a href='/register/' class={`text-nowrap rounded-lg p-2 px-4 border hover:bg-orange-600 touch:active:bg-orange-600 bg-orange-500 border-orange-500 hover:border-orange-600 touch:active:border-orange-600 dark:bg-orange-600 dark:border-orange-600 dark:hover:bg-orange-600/80 dark:touch:active:bg-orange-600/80 dark:hover:border-[#CA430B] dark:touch:active:border-[#CA430B] text-white transition-colors cursor-pointer ${className}`}>
      Registrarse
    </a>
  )
}
