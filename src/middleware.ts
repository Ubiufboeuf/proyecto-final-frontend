import { defineMiddleware, sequence } from 'astro:middleware'
import { errorHandler } from './lib/utils'
import { validateToken } from './services/userService'
import type { User } from './env'

const auth = defineMiddleware(async (context, next) => {
  // Esto es para crear una cookie para pruebas, pero igual, algo así debería ser la configuración de la real
  // context.cookies.set('berrutti-web-auth-token', 'token1', {
  //   httpOnly: true,
  //   sameSite: 'strict',
  //   path: '/',
  //   secure: true
  // })
  const token = context.cookies.get('berrutti-web-auth-token')

  if (!token) {
    next()
    return
  }

  // isLoading es para diferenciar el false de isAuth de "sin verificar" y "verificado fallido"
  let user: User | null = null
  let isAuth: boolean = false
  let isLoadingAuth: boolean = true

  try {
    [isAuth, user] = await validateToken(token.value)
  } catch (err) {
    errorHandler(err)
  } finally {
    isLoadingAuth = false
  }

  if (!isAuth || !user) {
    next()
    return
  }

  context.locals.isLoadingAuth = isLoadingAuth
  context.locals.isAuth = isAuth
  context.locals.user = user

  next()
})

export const onRequest = sequence(auth)
