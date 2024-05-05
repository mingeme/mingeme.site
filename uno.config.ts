import { defineConfig, presetIcons, presetMini, presetTypography } from 'unocss';

export default defineConfig({
  presets: [
    presetMini({
      dark: 'class',
    }),
    presetTypography(),
    presetIcons(),
  ],
});
