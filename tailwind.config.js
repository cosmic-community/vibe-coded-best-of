/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        ink: '#0F172A',
        accent: '#FCAA0A',
        muted: '#F3F1EC',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      transitionDuration: {
        'hover': '200ms',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}