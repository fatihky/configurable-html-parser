import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'examples/simple.ts',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});
