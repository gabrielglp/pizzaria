/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        animate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        animate: 'animate 2s infinite',
      },
      placeholderColor: ['hover', 'focus'],
      colors: {
        white: '#FFF',
        black: '#000',

        'dark-900': '#101026',
        'dark-700': '#1D1D2E',

        'gray-100': '#8A8A8A',
        'green-900': '#3fffa3',
        'red-900': '#FF3F4B',

        'placeholder-white': 'rgba(255, 255, 255, 0.8)',
      },
    },
  },
  plugins: [],
};
