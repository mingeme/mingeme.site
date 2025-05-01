import presetWind4 from '@unocss/preset-wind4';
import { defineConfig, presetIcons, presetTypography } from 'unocss';

export default defineConfig({
  safelist: [
    ...Array.from({ length: 6 }, (_, i) => `pl-${i * 4}`),
  ],
  theme: {
    colors: {
      second: '#E2E2E2',
    },
  },
  presets: [
    presetWind4({
      dark: 'class',
    }),
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
