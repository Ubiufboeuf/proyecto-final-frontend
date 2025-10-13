import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const SESSION_TOKEN_NAME = 'berrutti-web-auth-token'

  cookies.delete(SESSION_TOKEN_NAME, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  })

  return redirect('/')
}
