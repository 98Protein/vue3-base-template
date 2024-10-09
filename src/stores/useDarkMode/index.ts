import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

// 创建暗黑模式存储
export const useDarkModeStore = defineStore('darkMode', () => {
  // 使用 VueUse 提供的 useDark 来管理暗黑模式的状态
  const isDark = useDark()

  // 切换暗黑模式的函数
  const toggleDark = (bl?: boolean) => {
    // 如果没有传入参数，则反转当前的暗黑模式状态
    if (bl === undefined) isDark.value = !isDark.value
    // 如果传入参数，则根据参数值设置暗黑模式状态
    else isDark.value = Boolean(bl)
  }

  // 返回当前的暗黑模式状态和切换函数
  return { isDark, toggleDark }
})
