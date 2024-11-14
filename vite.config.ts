import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import Compression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// Vite 配置文件
export default defineConfig((env: ConfigEnv) => {
  const { mode, command } = env
  // 环境变量文件路径
  const envDir = path.resolve(__dirname, './env')
  // 环境变量
  const viteENV = loadEnv(mode, envDir)
  const isBuild = command === 'build'
  return {
    plugins: [
      // 插件配置
      vue(),
      vueDevTools(),
      createHtmlPlugin({
        inject: {
          data: {
            documentTitle: viteENV.VITE_APP_NAME,
          },
        },
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.ts等文件时不需要重新运行也生效配置
        restart: ['vite.config.ts', 'package.json', 'tsconfig.json'],
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: 'types/auto-imports.d.ts',
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: 'types/components.d.ts',
      }),
      isBuild &&
        Compression({
          // 启用 gzip 压缩
          algorithm: 'gzip',
          ext: '.gz',
        }),
      isBuild &&
        visualizer({
          filename: 'bundleView.html',
          open: true, // 打包后自动打开分析页面
        }),
    ].filter(Boolean), // 过滤掉 false 的插件配置
    resolve: {
      // 别名配置
      alias: {
        '@': path.resolve(__dirname, './src'),
        '#': path.resolve(__dirname, './src/types'),
        '~': path.resolve(__dirname, './src/assets'),
      },
    },
    server: {
      /** 设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址 */
      host: true,
      /** 端口被占用时，是否直接退出 | 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口 */
      strictPort: false,
      /** 是否自动打开浏览器 */
      open: true,
      /** 是否允许跨域 */
      cors: true,
      /** 反向代理配置（主要是开发时用来解决跨域问题） */
      proxy: {
        [viteENV.VITE_APP_BASE_API]: {
          target: viteENV.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(viteENV.VITE_APP_BASE_API, ''),
        },
      },
    },
    esbuild: {
      /**
       * 打包后是否移除所有的 console、debugger
       * http://cosarty.cn/doc/essay/handbook/esbuild.html#drop
       */
      drop: viteENV.VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
      /**
       * 打包后是否移除所有的注释
       * http://esbuild.docschina.org/api/#legal-comments
       */
      legalComments: viteENV.VITE_CLEAR_COMMENT ? 'none' : 'inline',
    },
  }
})
