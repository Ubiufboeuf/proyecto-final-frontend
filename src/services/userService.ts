import type { User } from '@/env'

export async function validateToken (token: string): Promise<[boolean, User]> {
  // mocks
  const isAuth = true
  const user: User = { name: 'Manolo', username: 'ElHueso123', role: 'client' }

  // fetch(endpoint_validate_cookie, {..., cookie})
  
  return [isAuth, user]
}

export async function getUserData (): Promise<User> {
  return { name: 'Manolo', username: 'ElHueso123', role: 'client' }
}
