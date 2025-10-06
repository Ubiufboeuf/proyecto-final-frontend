import type { CSSProperties, ReactNode } from 'preact/compat'

export function Icon ({ children, class: className, style, hidden = false }: { children: ReactNode, class?: string, style?: CSSProperties, hidden?: boolean }) {
  return (
    <div 
      className={`icon max-h-full max-w-full aspect-square [&>*]:h-full [&>*]:w-full [&>*]:aspect-square [&>*]:max-h-full [&>*]:max-w-full [&>*]:select-none ${className}`}
      style={style}
      hidden={hidden}
    >
      {children}
    </div>
  )
}
