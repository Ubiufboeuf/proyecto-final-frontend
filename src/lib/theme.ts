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

  const _path = cookieParams?.path
  const _secure = cookieParams?.secure
  const _samesite = cookieParams?.samesite

  const path = _path ? `; path=${_path}` : ''
  const secure = _secure ? `; secure=${_secure}` : ''
  const samesite = _samesite ? `; samesite=${_samesite}` : ''

  document.cookie = `${cookieName}=${value} ${path} ${secure} ${samesite}`
  console.log(`${cookieName}=${value} ${path} ${secure} ${samesite}`)

  console.log({ cookie: cookieName, value, cookieParams })
  console.log(getCookie('berrutti-web-theme'))
}
