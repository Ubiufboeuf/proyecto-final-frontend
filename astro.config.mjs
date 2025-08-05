// @ts-check
import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'
// import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
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
