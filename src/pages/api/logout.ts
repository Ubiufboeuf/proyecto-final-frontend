import { SESSION_COOKIE_NAME } from '@/lib/constants'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(SESSION_COOKIE_NAME, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  })

  return redirect('/')
}
