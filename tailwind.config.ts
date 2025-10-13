import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#e66e19',
        'background-light': '#f8f7f6',
      },
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
