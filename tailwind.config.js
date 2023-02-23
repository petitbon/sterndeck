/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'stern-blue': '#12E8F0',
        'stern-red': '#1279F0',
        error: '#FF0000',
      },
    },
  },

  plugins: [],
};
