import type { Cookie } from '@/env'

export function getThemeCookie (cookieName: string): Cookie {
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((cookie) => cookie.includes(cookieName))?.split('=')

  return {
    cookie: cookie?.[0] ?? cookieName,
    value: cookie?.[1] ?? 'system'
  }
}

export function setThemeCookie (cookieName: string, value: string) {
  if (!cookieName || !value) return

  document.cookie = `${cookieName}=${value}; path=/; Secure; SameSite=Strict`
}

