/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  //  应用名称
  readonly VITE_APP_NAME: string
  //  当前环境
  readonly VITE_APP_ENV: string
  //  服务端接口地址
  readonly VITE_APP_BASE_URL: string
  // 服务端接口公共前缀
  readonly VITE_APP_BASE_API: string
  // 打包后移除所有的 console、debugger
  readonly VITE_DROP_CONSOLE: string
  // 打包后是否移除所有的注释
  readonly VITE_CLEAR_COMMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** 解决 vue 模块导入报错问题 */
declare module '*.vue' {
  import { DefineComponent, readonly, readonly, readonly } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.scss' {
  const scss: Record<string, string>
  export default scss
}
