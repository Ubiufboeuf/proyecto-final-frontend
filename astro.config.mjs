// @ts-check
import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://proyecto-final-frontend.pages.dev',
  output: 'static',
  base: '/'
})
