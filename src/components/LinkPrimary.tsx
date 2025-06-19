import type { CSSProperties, ReactNode } from 'preact/compat'

export function LinkPrimary ({ href, class: className, style, children }: { href: string, class?: string, style?: CSSProperties, children?: ReactNode }) {
  return (
    <a
      href={href}
      className={`w-fit h-fit p-2 px-4 flex items-center justify-center rounded-lg bg-background text-primary ${className}`}
      style={style}
    >
      {children}
    </a>
  )
}
