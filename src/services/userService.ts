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

  console.log('userService', { isAuth, user })

  return [isAuth, user]
}

export async function getUserData (token: string): Promise<User | null> {
  const users: { [key: string]: User } = {
    'token1': { fullName: 'Federico Artencio', document: '56942082', mail: 'fede.2007.artencio.u@gmail.com', password: 'Un qué?', role: 'client' },
    'token2': { fullName: 'Matías Iturralde', document: '45226454', tel: '+598 97 308 696', password: 'enElMacdonalsNoVendenDonas', role: 'client' }
  }

  let user: User | null = null

  if (users[token as keyof typeof users]) { 
    user = users[token as keyof typeof users]
  }

  return user
}
