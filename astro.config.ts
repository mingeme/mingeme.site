import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers';
import tailwindcss from '@tailwindcss/vite';
import umami from '@yeskunall/astro-umami';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mingeme.site',
  prefetch: true,
  integrations: [
    mdx(),
    sitemap(),
    umami({ id: '5b0216af-471b-4774-947c-3fa8879f0243' }),
  ],
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
