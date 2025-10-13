import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers';
import tailwindcss from '@tailwindcss/vite';
import umami from '@yeskunall/astro-umami';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [umami({ id: '5b0216af-471b-4774-947c-3fa8879f0243' })],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
      },
      wrap: true,
      transformers: [transformerNotationDiff(), transformerNotationHighlight()],
    },
  },
});
