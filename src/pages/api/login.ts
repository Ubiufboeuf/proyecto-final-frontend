import { SESSION_COOKIE_NAME } from '@/lib/constants'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ cookies, redirect }) => {  
  cookies.set(SESSION_COOKIE_NAME, 'token1', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  })

  return redirect('/', 302)
}
