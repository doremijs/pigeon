import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import vitePluginImp from 'vite-plugin-imp'

export default defineConfig({
  server: {
    port: 9002,
    proxy: {
      '^/api': {
        target: 'http://localhost:9001',
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // globalVars: {},
        modifyVars: {
          'root-entry-name': 'variable'
        },
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style(name) {
            // use less
            return `antd/es/${name}/style/index.js`;
          },
        },
      ]
    }),
    WindiCSS()
  ],
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: ''
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  }
})
