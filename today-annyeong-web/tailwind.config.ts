import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: '#1D9E75', dark: '#0F6E56', light: '#E1F5EE', text: '#085041' },
        cream:   { DEFAULT: '#FFFDF9', card: '#F5F1E8', pressed: '#EDE9DE' },
        pos:     { bg: '#E1F5EE', border: '#9FE1CB', text: '#085041' },
        neu:     { bg: '#F5F1E8',  border: '#D3D1C7', text: '#2C2C2A' },
        neg:     { bg: '#FAEEDA', border: '#FAC775', text: '#633806' },
        alrt:    { bg: '#FCEBEB', border: '#F7C1C1', text: '#791F1F' },
        ink:     { DEFAULT: '#2C2C2A', sub: '#5F5E5A', hint: '#9A9793' },
        border:  '#E0DDD5',
      },
      minHeight: { btn: '68px', 'btn-sm': '54px' },
      borderRadius: { '2.5xl': '20px' },
    },
  },
  plugins: [],
}

export default config
