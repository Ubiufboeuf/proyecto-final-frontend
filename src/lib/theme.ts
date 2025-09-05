import type { Cookie, CookieParams } from '@/env'

export function getCookie (cookieName: string): Cookie {
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((cookie) => cookie.includes(cookieName))?.split('=')

  return {
    cookie: cookie?.[0] ?? cookieName,
    value: cookie?.[1] ?? ''
  }
}

export function setCookie (cookieName: string, value: string, cookieParams?: CookieParams) {
  if (!cookieName || !value) return

  const parts = [`${cookieName}=${value}`]

  if (cookieParams?.path) parts.push(`path=${cookieParams.path}`)
  if (cookieParams?.secure) parts.push('Secure')
  if (cookieParams?.samesite) parts.push(`SameSite=${cookieParams.samesite.charAt(0).toUpperCase() + cookieParams.samesite.slice(1)}`)

  document.cookie = parts.join('; ')

  console.log('Set cookie:', document.cookie)
}

