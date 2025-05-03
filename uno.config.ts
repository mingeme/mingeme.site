import presetWind4 from '@unocss/preset-wind4';
import { defineConfig, presetAttributify, presetIcons, presetTypography } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      second: '#E2E2E2',
      border: 'var(--border)',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },
      destructive: {
        DEFAULT: 'var(--destructive)',
        foreground: 'var(--destructive-foreground)',
      },
      card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
      },
      popover: {
        DEFAULT: 'var(--popover)',
        foreground: 'var(--popover-foreground)',
      },
      sidebar: {
        DEFAULT: 'var(--sidebar-background)',
        foreground: 'var(--sidebar-foreground)',
        primary: {
          DEFAULT: 'var(--sidebar-primary)',
          foreground: 'var(--sidebar-primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--sidebar-accent)',
          foreground: 'var(--sidebar-accent-foreground)',
        },
        border: 'var(--sidebar-border)',
        ring: 'var(--sidebar-ring)',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
  },
  presets: [
    presetWind4({
      dark: 'class',
    }),
    presetAttributify(),
    presetTypography({
      cssExtend: {
        ':not(pre) > code::before,:not(pre) > code::after': {
          content: '',
        },
        ':not(pre) > code': {
          'background-color': '#e5e5e5',
          'word-wrap': 'break-word',
          'padding': '.1rem .3rem .2rem',
          'border-radius': '.2rem',
        },
        '.dark :not(pre) > code': {
          'background-color': '#404040',
        },
      },
    }),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
  ],
});
