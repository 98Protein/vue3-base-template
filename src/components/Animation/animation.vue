<!--
 * @Author: liangtd
 * @Date: 2024-09-27 16:55:58
 * @LastEditors: liangtd
 * @LastEditTime: 2024-10-08 10:29:47
 * @Description: 全局动画效果组件
 -->
<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 * 组件的Props接口定义
 */
interface IProps {
  animateCalss?: string // 配合animate.css使用，效果更佳
  duration?: string // 动画持续时间
  once?: boolean // 动画是否只播放一次
}

const Props = withDefaults(defineProps<IProps>(), {
  animateCalss: 'rise_up',
  duration: '0.5s',
  once: true,
})

/**
 * 定义动画显示状态
 */
const show = ref(true)

/**
 * 获取容器元素的引用
 */
const containerBox = ref<HTMLElement | null>(null)

/**
 * 使用交叉观察器监测容器元素的可见性
 * 一旦元素进入视口，根据Props设定动画显示状态
 */
const { stop } = useIntersectionObserver(containerBox, ([{ isIntersecting }]) => {
  show.value = isIntersecting
  if (Props.once) {
    stop()
  }
})
</script>

<template>
  <div :class="show ? Props.animateCalss : ''" ref="containerBox">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
/**
 * 动画效果定义
 */
.rise_up {
  --animate-duration: v-bind(Props.duration);
  animation: up var(--animate-duration) ease-in-out;
  @keyframes up {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
