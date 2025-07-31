import type { CSSProperties, ReactNode } from 'preact/compat'

export function Link ({ children, href, class: className, style, activeClassName = 'inClick' }: { children?: ReactNode, href: string, class?: string, style?: CSSProperties, activeClassName?: string }) {
  return (
    <a
      href={href}
      class={className}
      style={style}
      onMouseDown={(e) => e.currentTarget.classList.add(activeClassName)}
      onTouchStart={(e) => e.currentTarget.classList.add(activeClassName)}
      onMouseUp={(e) => e.currentTarget.classList.remove(activeClassName)}
      onTouchEnd={(e) => e.currentTarget.classList.remove(activeClassName)}
    >
      {children}
    </a>
  )
}
