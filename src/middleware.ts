// // src/middleware.js (o .ts si usas TypeScript)
// import { defineMiddleware, sequence } from 'astro:middleware'

// // Define tus rutas protegidas
// const PROTECTED_ROUTES = [
//   '/dashboard',
//   '/pagos',
//   '/perfil'
//   // Agregá aquí todas las rutas de Astro que requieren autenticación
// ]

// // Reemplaza esta URL con la URL de tu backend PHP
// // Asegúrate de que sea la URL completa donde está tu endpoint de verificación de JWT
// const PHP_AUTH_VERIFY_ENDPOINT = 'http://tu-backend-php.com/api/verify-jwt'

// // Middleware principal de autenticación
// const authMiddleware = defineMiddleware(async (context, next) => {
//   const currentPath = new URL(context.request.url).pathname

//   // Si la ruta NO es protegida, simplemente continuamos
//   if (!PROTECTED_ROUTES.includes(currentPath)) {
//     return next()
//   }

//   // --- Lógica para rutas protegidas ---

//   // 1. Intentar obtener el JWT de la cookie
//   // 'jwt_token' debe coincidir con el nombre de la cookie que PHP establece
//   const jwtToken = context.cookies.get('jwt_token')?.value

//   // Si no hay token, redirigir a login
//   if (!jwtToken) {
//     console.log(`[Auth Middleware] No JWT found for protected route: ${currentPath}. Redirecting to /login.`)
//     return context.redirect('/login')
//   }

//   // 2. Hacer una petición interna al backend PHP para validar el JWT
//   // Es crucial que esta llamada sea segura y que el backend PHP
//   // haga una validación criptográfica completa del JWT (firma, expiración, etc.).
//   try {
//     const response = await fetch(PHP_AUTH_VERIFY_ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${jwtToken}` // Enviar el JWT para validación
//       }
//       // Puedes enviar el cuerpo si tu endpoint de PHP lo requiere,
//       // pero a menudo la validación se hace solo con el header Authorization.
//       // body: JSON.stringify({ token: jwtToken })
//     })

//     if (response.ok) {
//       // El JWT es válido, permitir que la petición continúe
//       console.log(`[Auth Middleware] JWT valid for route: ${currentPath}.`)
//       return next()
//     } else if (response.status === 401) {
//       // El JWT es inválido o expiró
//       console.log(`[Auth Middleware] Invalid JWT for route: ${currentPath}. Redirecting to /login.`)
//       // Opcional: Podrías limpiar la cookie aquí si el token es inválido
//       // context.cookies.delete('jwt_token', { path: '/' });
//       return context.redirect('/login')
//     } else {
//       // Otro tipo de error del servidor PHP
//       console.error(`[Auth Middleware] PHP verification error (${response.status}) for route: ${currentPath}.`)
//       return context.redirect('/error') // Redirigir a una página de error genérica
//     }

//   } catch (error) {
//     console.error(`[Auth Middleware] Error contacting PHP backend for validation (${currentPath}):`, error)
//     // En caso de error de red o backend no disponible, redirigir a login o error
//     return context.redirect('/login') // O a una página de error
//   }
// })

// // Exporta el middleware. Si tenés varios, usa sequence para encadenarlos.
// export const onRequest = sequence(authMiddleware)
