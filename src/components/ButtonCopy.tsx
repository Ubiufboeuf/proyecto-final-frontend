import { type CSSProperties, type ReactNode } from 'preact/compat'

export function ButtonCopy ({ id, copy, setCopied, children, class: className, style }: { id: string, copy: string, setCopied: (newValue: string | null) => void, children: ReactNode, class?: string, style?: CSSProperties }) {
  async function copyToClipboard () {
    try {
      await navigator.clipboard.writeText(copy)
      setCopied(id)
      setTimeout(() => setCopied(null), 1000)
    } catch {
      alert('No puedes copiar cosas en desarrollo (http) de esta forma (con botones), si quieres copiar hazlo a mano.')
    }
  }
  
  return (
    <button
      class={`h-fit w-fit flex items-center justify-center px-3 py-2 font-medium bg-white hover:bg-orange-50 touch:active:bg-orange-50 text-orange-500 text-sm gap-2 border border-orange-300 hover:text-gray-700 touch:active:text-gray-700 rounded-md cursor-pointer transition-colors dark:bg-transparent dark:border-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-50 dark:hover:border-orange-50 dark:touch:active:bg-gray-700 dark:touch:active:text-orange-50 dark:touch:active:border-orange-50 ${className}`}
      style={style}
      onClick={copyToClipboard}
    >
      {children}
    </button>
  )
}
