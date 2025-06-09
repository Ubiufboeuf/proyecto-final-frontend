import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import { useEffect } from 'react'

// export const links: Route.LinksFunction = () => []

export function Layout ({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    detectDeviceType()
  }, [])

  function detectDeviceType () {
    const ua = navigator.userAgent
    const body = document.body
  
    // Eliminar todas las clases relevantes de una vez.
    body.classList.remove('is-mobile-ua', 'is-tablet-ua', 'is-laptop-ua')
  
    // Expresiones regulares precompiladas para mayor eficiencia
    const mobileRegex = /(Mobi|Android|iPhone|iPod|Windows Phone|BlackBerry|Symbian|IEMobile|Opera Mini|Fennec|webOS|hpwos|avantgo|bada|blazer|compal|elaine|hiptop|kindle|lge|maemo|midp|mmp|netfront|palm|phone|plucker|pocket|psp|series60|treo|up\.browser|up\.link|vodafone|wap|windows ce|xda|xiino)/i
  
    if (mobileRegex.test(ua)  && !/iPad/i.test(ua)) {
      body.classList.add('is-mobile-ua')
    }
  }

  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App () {
  return <Outlet />
}

export function ErrorBoundary ({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oh no!'
  let details = 'Ocurrió un error inesperado.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'No se encontró la página solicitada.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
