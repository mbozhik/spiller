import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
  mode: 'jit',
  darkMode: ['class'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      xl: {max: '1536px'},
      lg: {max: '1280px'},
      sm: {max: '768px'},
      xs: {max: '350px'},
    },
    extend: {
      colors: {
        custom: {
          grey: '#444444',
          grey2: '#666666',
          area: '#7D756F',
          nav: '#DDDDDD',
          blue: '#2F495A',
          hytec: '#0B599E',
        },
      },
      boxShadow: {
        nav: '0px 13px 32px -19px #000',
        nav_mobile: '0px 3px 12px 2px #00000050;',
        hytec: '0px -7px 32px -19px #000',
        hytec_mobile: '0px -3px 12px 2px #00000050;',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value: string) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
    require('tailwindcss-animate'),
  ],
} satisfies Config

export default config
