import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import cloudflare from '@astrojs/cloudflare'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), react()],
  output: 'server',
  adapter: cloudflare(),
  outDir: './distro/dist',
  server: {
    port: 1234,
    host: true
  }
})
