import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF5FF',
          100: '#D6EBFF',
          200: '#ADD6FF',
          300: '#75B8FF',
          400: '#3D9AFF',
          500: '#1565C0',
          600: '#0D47A1',
          700: '#0A3680',
          800: '#072660',
          900: '#041840',
        },
        accent: {
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFD600',
          600: '#FFC107',
          700: '#FFB300',
          800: '#FF8F00',
          900: '#FF6F00',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
