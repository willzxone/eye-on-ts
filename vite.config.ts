import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import path from 'path';
import {defineConfig} from 'vite';
import babel from 'vite-plugin-babel';
import relay from 'vite-plugin-relay';
import {stylexPlugin} from 'vite-plugin-stylex-dev';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [jotaiDebugLabel, jotaiReactRefresh],
      },
    }),
    stylexPlugin(),
    relay,
    babel(),
  ],
  worker: {
    plugins: () => [relay],
  },
});
