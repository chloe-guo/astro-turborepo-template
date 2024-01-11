// tailwind.config.cjs
import { nextui } from '@nextui-org/react'

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  plugins: [nextui()]
}
