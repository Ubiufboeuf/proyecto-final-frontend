// @ts-check
import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'

import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  site: 'proyecto-final-frontend.pages.dev',
  output: 'static',
  adapter: cloudflare()
})
