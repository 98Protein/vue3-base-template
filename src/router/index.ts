// 引入 Vue Router 和创建Web历史记录的方法
import { createRouter, createWebHistory } from 'vue-router'
// 定义路由数组
const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    meta: { title: 'Home' },
    component: () => import('@/views/index/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { title: '404' },
    component: () => import('@/views/error/404.vue'),
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 导出路由实例
export default router
