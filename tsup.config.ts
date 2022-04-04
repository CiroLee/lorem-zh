import tsup, { Options } from 'tsup';
const { defineConfig } = tsup;
export default defineConfig((options: Options) => {
  return {
    entry: ['src/index.ts'],
    outDir: 'lib',
    format: ['esm', 'cjs'],
    dts: {
      entry: ['src/index.ts'],
    },
    minify: false,
    watch: options.watch,
    clean: true,
    splitting: true,
  };
});
