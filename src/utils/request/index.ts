/*
 * @Author: liangtd
 * @Date: 2024-10-09 10:59:21
 * @LastEditors: liangtd
 * @LastEditTime: 2024-11-14 10:12:28
 * @Description: axios请求工具类
 */
import axios, { type AxiosRequestConfig, type CustomParamsSerializer } from 'axios'
import { stringify } from 'qs'
import useEnv from '@/hooks/useEnv'
import { getToken, setToken } from '@/utils/token'

const { VITE_APP_ENV, VITE_APP_BASE_URL, VITE_APP_BASE_API } = useEnv() // 解构环境变量

/** 请求默认配置 */
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间 5s
  timeout: 5000,
  // 请求头
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

/** 创建axios实例 */
const service = axios.create({
  baseURL: VITE_APP_ENV === 'development' ? VITE_APP_BASE_API : VITE_APP_BASE_URL + VITE_APP_BASE_API,
  ...defaultConfig,
})

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 添加token到header
    const token = getToken()
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(new Error('网络错误'))
  },
)

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  (res) => {
    // 是否返回原生 response.data
    const withoutTransformResponse = res.config.headers['withoutTransformResponse'] === false
    // 是否二进制数据
    const isBinary = ['blob', 'arraybuffer'].includes(res.request.responseType)
    if (withoutTransformResponse || isBinary) return res.data
    // 非二进制数据进行拦截判定统一处理
    if (res.data.code === 200) {
      // 续期token
      const newToken = res.headers['Authorization']
      if (newToken) {
        setToken(newToken)
      }
      // TODO 根据服务端数据结构进行修改
      return res.data
    }
    const message = res.data.message || `系统未知错误，请反馈给管理员`
    return Promise.reject(new Error(message))
  },
  (error) => {
    console.error(error)
    return Promise.reject(new Error('网络错误'))
  },
)

export default service
