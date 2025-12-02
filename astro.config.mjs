// @ts-check
import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'
import { readFileSync } from 'node:fs'

let cert
let key
try {
  cert = readFileSync('.cert/cert.pem')
  key = readFileSync('.cert/key.pem')
} catch {
  console.warn('- No se encontraron certificados, se levanta HTTP -')
}

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      https: {
        cert,
        key
      },
      hmr: {
        host: 'monado.dev.local', // Usar el dominio proxyado
        clientPort: 443, // Usar el puerto de entrada de Apache
        protocol: 'wss' // Usar protocolo seguro
      }
    }
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
