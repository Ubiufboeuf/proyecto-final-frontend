import { defineMiddleware, sequence } from 'astro:middleware'
import { errorHandler } from './lib/utils'
import { validateToken } from './services/userService'
import type { User } from './env'
import { SESSION_COOKIE_NAME } from './lib/constants'

const routesToAuth = [
  '/me/',
  '/me',
  '/driver/',
  '/driver'
]

const auth = defineMiddleware(async (context, next) => {
  const { pathname } = context.url
  const token = context.cookies.get(SESSION_COOKIE_NAME)
  
  if (!token) {
    context.locals.isLoading = false
    context.locals.isAuth = false
    context.locals.user = null
    
    return next()
  }

  // Si la ruta no es para autenticar, entonces evita conseguir los datos del usuario
  if (!routesToAuth.includes(pathname)) {
    context.locals.isLoading = false
    context.locals.isAuth = true
    context.locals.user = null
    
    return next()
  }
  
  // isLoading es para diferenciar el false de isAuth de "sin verificar" y "verificado fallido"
  let user: User | null = null
  let isAuth: boolean = false
  let isLoading: boolean = true

  try {
    [isAuth, user] = await validateToken(token.value)
  } catch (err) {
    errorHandler(err)
  } finally {
    isLoading = false
  }

  context.locals.isLoading = isLoading
  context.locals.isAuth = isAuth
  context.locals.user = user

  return next()
})

export const onRequest = sequence(auth)
