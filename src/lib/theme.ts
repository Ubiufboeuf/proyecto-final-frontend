import type { Cookie } from '@/env'

export function getCookie (cookieName: string): Cookie {
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((cookie) => cookie.includes(cookieName))?.split('=')

  return {
    cookie: cookie?.[0] ?? cookieName,
    value: cookie?.[1] ?? 'system'
  }
}

export function setCookie (cookieName: string, value: string) {
  if (!cookieName || !value) return

  document.cookie = `${cookieName}=${value}; path=/; Secure; SameSite=Strict`

  console.log('Set cookie:', document.cookie)
}

