/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-300': '#A0ECB1',
        'green-500': '#32D657',

        'red-300': '#F7D4D3',
        'red-500': '#DD524C',

        'yellow-100': '#F5E8D5',
        'yellow-300': '#F5D565',
        'yellow-500': '#E9A23B',

        'blue-500': '#3662E3',

        'neutral-50': '#F8FAFC',
        'neutral-100': '#E3E8EF',
        'neutral-400': '#97A3B6',
      },
      height: {
        13: '3.25rem',
      },
      width: {
        13: '3.25rem',
      },
      maxWidth: {
        xl: '34.5rem',
      },
      fontSize: {
        xs: ['0.75rem', '1.25'],
        sm: ['0.875rem', '1.25'],
        base: ['1rem', '1.25'],
        lg: ['1.125rem', '1.25'],
        xl: ['1.25rem', '1.25'],
        '2xl': ['1.5rem', '1.25'],
        '3xl': ['1.875rem', '1.25'],
        '4xl': ['2.5rem', '1.25'],
        '5xl': ['3rem', '1.25'],
        '6xl': ['3.75rem', '1.25'],
        '7xl': ['4.5rem', '1.25'],
      },
    },
    fontFamily: {
      sans: '"Outfit", sans-serif',
    },
  },
  plugins: [],
}
