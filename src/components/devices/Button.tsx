import type { CSSProperties, ReactNode } from 'preact/compat'

export function Button ({ children, class: className, style, activeClassName = 'inClick' }: { children?: ReactNode, class?: string, style?: CSSProperties, activeClassName?: string }) {
  return (
    <button
      class={className}
      style={style}
      onMouseDown={(e) => e.currentTarget.classList.add(activeClassName)}
      onTouchStart={(e) => e.currentTarget.classList.add(activeClassName)}
      onMouseUp={(e) => e.currentTarget.classList.remove(activeClassName)}
      onTouchEnd={(e) => e.currentTarget.classList.remove(activeClassName)}
    >
      {children}
    </button>
  )
}
