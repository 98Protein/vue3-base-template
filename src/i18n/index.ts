import { getFromLocal, saveToLocal } from '@/utils'
import { createI18n } from 'vue-i18n'
import zhCn from './locales/zh-cn'
import en from './locales/en'
import { toRef, watch } from 'vue'

// 本地语言键值
const localLangKey = 'lang'

// 创建国际化实例
const i18n = createI18n({
  locale: getFromLocal(localLangKey) || 'zh-cn',
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': zhCn,
    en,
  },
})

// 语言类型定义
type LangType = 'zh-cn' | 'en'

// 设置语言的函数
const setLang = (lang: LangType = 'zh-cn') => {
  i18n.global.locale = lang
  saveToLocal(localLangKey, lang)
  document.querySelector('html')?.setAttribute('lang', lang)
}

// 当前语言的引用
const curLang = toRef(i18n.global, 'locale')

// 监听当前语言变化的逻辑
const stopLangWatch = watch(curLang, (lang) => {
  setLang(lang)
})

// 初始化语言
setLang(getFromLocal(localLangKey))

// 导出国际化实例、设置语言函数、当前语言和停止监听函数
export { i18n, setLang, curLang, stopLangWatch }
// 导出语言类型
export type { LangType }
