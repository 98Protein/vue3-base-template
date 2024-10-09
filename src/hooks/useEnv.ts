/*
 * @Author: liangtd
 * @Date: 2024-10-09 11:19:38
 * @LastEditors: liangtd
 * @LastEditTime: 2024-10-09 11:29:40
 * @Description: 统一处理环境变量
 */
export default (): ImportMetaEnv => {
  const env = {} as ImportMetaEnv

  for (const [key, value] of Object.entries(import.meta.env)) {
    // 自定义的环境变量（命名必须以 VITE_ 开头）
    if (!key.includes('VITE_')) continue

    if (['true', 'false'].includes(value)) {
      env[key] = value === 'true' ? true : false // 布尔类型处理
    } else if (Number(value)) {
      env[key] = Number(value) // 数值类型处理
    } else {
      env[key] = value // 字符串类型原值即可
    }
  }

  return env
}
