import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          grey: '#444444',
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
    },
    screens: {
      xl: {max: '1536px'},
      lg: {max: '1280px'},
      sm: {max: '768px'},
      xs: {max: '350px'},
    },
  },
  plugins: [
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value: string) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
  ],
}

export default config
