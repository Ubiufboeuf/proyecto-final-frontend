import type { Cookie } from '@/env'

const COOKIE_NAME = 'berrutti-web-theme'

export function getThemeCookie (): Cookie {
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((cookie) => cookie.includes(COOKIE_NAME))?.split('=')

  return {
    cookie: cookie?.[0] ?? COOKIE_NAME,
    value: cookie?.[1] ?? 'system'
  }
}

export function setThemeCookie (newValue: string) {
  if (!COOKIE_NAME || !newValue) return

  document.cookie = `${COOKIE_NAME}=${newValue}; path=/; Secure; SameSite=Strict`
}

