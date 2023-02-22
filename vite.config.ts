import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path, { join } from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [preact(), EnvironmentPlugin('all', { prefix: '' })],
    resolve: {
      alias: {
        '@': join(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'build',
      lib: {
        entry: path.resolve(__dirname, 'src/main.tsx'),
        name: 'Connector',
        fileName: format => `connector.${format}.js`,
      },
    },
  }
})
