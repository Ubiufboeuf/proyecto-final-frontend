// @ts-check
import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'
// import { readFileSync } from 'node:fs'
// import node from '@astrojs/node'

// let httpsConfig = {}
// try {
//   const cert = readFileSync('.cert/cert.pem')
//   const key = readFileSync('.cert/key.pem')
//   httpsConfig = { server: { https: { cert, key } } }
// } catch {
//   console.warn('- No se encontraron certificados, se levanta HTTP -')
// }

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
    // ...httpsConfig
  },
  server: {
    allowedHosts: true
  },

  site: 'https://proyecto-final-frontend.pages.dev',
  base: '/',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile'
  }),
  redirects: {
    '/buy-ticket/': '/routes/'
  }
})
