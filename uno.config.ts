import { defineConfig, presetIcons, presetMini, presetTypography } from 'unocss';

export default defineConfig({
  presets: [
    presetMini({
      dark: 'class',
    }),
    presetTypography({
      cssExtend: {
        ':not(pre) > code::before,:not(pre) > code::after': {
          content: '&nbsp;&nbsp;',
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
