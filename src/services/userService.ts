import type { User } from '@/env'
import { errorHandler } from '@/lib/utils'

export async function validateToken (token: string): Promise<[boolean, User | null]> {
  let user: User | null = null
  try {
    user = await getUserData(token)
  } catch (err) {
    errorHandler(err, 'Error consiguiendo los datos del usuario', false)
  }

  const isAuth = Boolean(user)

  return [isAuth, user]
}

export async function getUserData (token: string): Promise<User | null> {
  const users: { [key: string]: User } = {
    'token1': { name: 'Manolo', username: 'ElHueso123', role: 'client' },
    'token2': { name: 'Pepito', username: 'ese_tipo', role: 'client' }
  }

  let user: User | null = null

  if (users[token as keyof typeof users]) { 
    user = users[token as keyof typeof users]
  }

  return user
}
