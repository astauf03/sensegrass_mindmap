import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://astauf03.github.io',
  base: '/sensegrass_mindmap',
  integrations: [react()],
  output: 'static'
});