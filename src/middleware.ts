import { clerkMiddleware } from '@clerk/astro/server'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

export const onRequest = clerkMiddleware({
  publishableKey,
  secretKey
})
