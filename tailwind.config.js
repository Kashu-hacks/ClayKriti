/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF6F4',
          100: '#F9E9E5',
          200: '#F4D6CE',
          300: '#E8AF9E',
          400: '#D9836B',
          500: '#C86D51',
          600: '#B45337',
          700: '#973F26',
          800: '#7C3520',
          900: '#652D1D',
        },
        clay: {
          ivory: '#FCFAF7',
          blush: '#F8EFEA',
          cream: '#F5EFE6',
          sand: '#EAE1D5',
          stone: '#D6C8B8',
          sage: '#8F9B88',
          sageDark: '#4A5B42',
          muted: '#85736C',
          charcoal: '#2D2320',
          dark: '#1C1513',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(200, 109, 81, 0.08), 0 2px 6px -1px rgba(45, 35, 32, 0.04)',
        'warm-lg': '0 12px 30px -4px rgba(200, 109, 81, 0.12), 0 4px 12px -2px rgba(45, 35, 32, 0.06)',
        'warm-hover': '0 20px 35px -5px rgba(200, 109, 81, 0.18), 0 8px 16px -3px rgba(45, 35, 32, 0.08)',
      }
    },
  },
  plugins: [],
}
