import type { CSSProperties, ReactNode } from 'preact/compat'

export function Icon ({ children, class: className, style }: { children: ReactNode, class?: string, style?: CSSProperties }) {
  return (
    <div 
      className={`icon max-h-full max-w-full aspect-square [&>*]:h-full [&>*]:w-full [&>*]:aspect-square [&>*]:max-h-full [&>*]:max-w-full [&>*]:select-none ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
