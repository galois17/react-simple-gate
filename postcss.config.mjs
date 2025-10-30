// In react-simple-gate/postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {
      // Tell this Tailwind v4 config where to scan for classes
      content: ['./src/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [],
    },
    'autoprefixer': {},
  },
};