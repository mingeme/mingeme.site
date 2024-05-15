import { defineConfig, presetIcons, presetMini, presetTypography, transformerDirectives } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      second: '#E2E2E2',
    },
  },
  transformers: [
    transformerDirectives(),
  ],
  presets: [
    presetMini({
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
    presetIcons(),
  ],
});
