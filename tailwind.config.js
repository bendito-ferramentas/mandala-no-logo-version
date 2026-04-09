/** @type {import('tailwindcss').Config} */

import { UI_COLORS, MARKET_COLORS } from './src/lib/utils/constants'

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [],
  theme: {
    fontFamily: {
      sans: ['Mandioca', 'sans-serif']
    },
    extend: {
      colors: {
        ...UI_COLORS,
        ...MARKET_COLORS
      },
      shadow: {
        DEFAULT: '0 4px 6px 0 rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}

Object.keys(config.theme.extend.colors).forEach(key => {
  config.safelist.push('fill-' + key)
  config.safelist.push('text-' + key)
  config.safelist.push('stroke-' + key)
  config.safelist.push('bg-' + key)
  config.safelist.push('hover:fill-' + key)
  config.safelist.push('hover:text-' + key)
  config.safelist.push('hover:stroke-' + key)
  config.safelist.push('hover:bg-' + key)
})


export default config