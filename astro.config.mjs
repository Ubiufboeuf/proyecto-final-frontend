// @ts-check
import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import clerk from '@clerk/astro'
// import { esUY } from '@clerk/localizations'

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), sitemap(), clerk()],

  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://proyecto-final-frontend.pages.dev',
  output: 'static',

  base: '/'
  
  // adapter: node
})
