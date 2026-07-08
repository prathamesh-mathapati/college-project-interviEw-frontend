/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 18px 60px -36px rgba(15, 23, 42, 0.42)',
      },
    },
  },
  plugins: [],
};
