/**
 * token操作封装
 */
const TOKEN_CACHE_NAME = 'token'

/**
 * 获取缓存的token
 */
export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_CACHE_NAME)
  if (!token) {
    return sessionStorage.getItem(TOKEN_CACHE_NAME)
  }
  return token
}

/**
 * 缓存token
 * @param token token
 * @param remember 是否永久存储
 */
export function setToken(token?: string, remember?: boolean) {
  removeToken()
  if (token) {
    if (remember) {
      localStorage.setItem(TOKEN_CACHE_NAME, token)
    } else {
      // 不同标签窗口的token不共享
      sessionStorage.setItem(TOKEN_CACHE_NAME, token)
    }
  }
}

/**
 * 移除token
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_CACHE_NAME)
  sessionStorage.removeItem(TOKEN_CACHE_NAME)
}
