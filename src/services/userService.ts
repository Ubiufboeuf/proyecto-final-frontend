import type { User } from '@/env'
import { ENDPOINTS } from '@/lib/constants'
import { errorHandler } from '@/lib/utils'

export async function validateToken (token: string): Promise<[boolean, User | null]> {
  let user: User | null = null
  try {
    user = await getUserData(token)
  } catch (err) {
    errorHandler(err, 'Error consiguiendo los datos del usuario')
  }

  const isAuth = Boolean(user)

  // console.log('userService', { isAuth, user })

  return [isAuth, user]
}

export async function getUserData (token: string): Promise<User | null> {
  let res
  try {
    res = await fetch(ENDPOINTS.GET_USER_DATA, {
      method: 'POST',
      body: JSON.stringify({ token })
    })
  } catch (err) {
    errorHandler(err, 'Error consiguiendo los datos del usuario')
    return null
  }

  if (!res?.ok) {
    throw new Error('Error en la petición')
  }

  let text = ''
  let data = null
  let errorParsingJSON: unknown | false = false

  try {
    text = await res.text()
    data = JSON.parse(text)
  } catch (err) {
    errorParsingJSON = err
  }

  if (errorParsingJSON !== false) {
    try {
      errorHandler(null, 'Error parseando la respuesta del servidor')
      // console.log('php data as text:', text)
      return null
    } catch (err) {
      errorHandler(err, 'Error mostrando la respuesta del servidor')
      return null
    }
  }

  // console.log('php data as json:', data)

  const usuario = data?.usuario

  if (!usuario) {
    throw new Error('No se recibió ningún usuario')
  }
    
  let role: User['role'] = 'client'
  if (usuario.rol === 'admin' || usuario.rol === 'driver') {
    role = usuario.rol
  }
  
  const user: User = {
    id: `${usuario.ID_Usuario}`,
    document: `${usuario.documento}`,
    fullName: `${usuario.nombre_completo}`,
    role,
    mail: `${usuario.correo}`,
    tel: `${usuario.telefono}`
  }
  
  return user
}
