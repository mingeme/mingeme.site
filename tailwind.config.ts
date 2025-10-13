import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Serif SC"', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
