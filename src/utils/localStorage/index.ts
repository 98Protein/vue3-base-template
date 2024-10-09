// 访问浏览器的本地存储
const ls = window.localStorage

// 将值保存到本地存储
const saveToLocal = (key: string, value: unknown) => {
  ls.setItem(key, JSON.stringify(value))
}

// 从本地存储获取值
const getFromLocal = (key: string) => {
  const val = ls.getItem(key)
  if (val) {
    try {
      return JSON.parse(val)
    } catch (error) {
      return val
    }
  }
  return undefined
}

// 从本地存储中移除指定的键
const removeFromLocal = (key: string) => {
  ls.removeItem(key)
}

// 清空本地存储
const clearLocal = () => {
  ls.clear()
}

// 导出本地存储相关的方法
export { saveToLocal, getFromLocal, removeFromLocal, clearLocal }
