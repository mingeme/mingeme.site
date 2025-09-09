import umami from '@yeskunall/astro-umami';
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [UnoCSS(), umami({ id: '5b0216af-471b-4774-947c-3fa8879f0243' })],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
