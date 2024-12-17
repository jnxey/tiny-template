import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';
import rollupResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { visualizer } from 'rollup-plugin-visualizer';

const rootDir = process.cwd();

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'esm',
    chunkFileNames: '[name].js',
    manualChunks: {
      mysql: ['mysql'],
      jsonwebtoken: ['jsonwebtoken']
    }
  },

  plugins: [
    typescript(),
    rollupResolve({
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    visualizer({ open: false }),
    alias({
      entries: [{ find: '@', replacement: resolve(rootDir, 'src') }]
    })
  ]
};
