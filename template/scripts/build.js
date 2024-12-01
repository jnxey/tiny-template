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
      // 手动指定共享的 chunk 文件
      mysql: ['mysql'],
      'koa-body': ['koa-body'],
      'crypto-js': ['crypto-js'],
      koa: ['koa'],
      'koa-router': ['@koa/router'],
      jsonwebtoken: ['jsonwebtoken'],
      jsencrypt: ['src/tools/jsencrypt/index.js']
    }
  },

  plugins: [
    typescript(),
    rollupResolve(),
    commonjs(),
    json(),
    visualizer({ open: true }),
    alias({
      entries: [{ find: '@', replacement: resolve(rootDir, 'src') }]
    })
  ]
};
