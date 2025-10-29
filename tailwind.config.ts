import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Scan your own library's components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;