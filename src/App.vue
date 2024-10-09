<template>
  <!-- 使用 Element Plus 的配置提供器并设置中文语言 -->
  <el-config-provider :locale="zhCn">
    <RouterView v-slot="{ Component, route }">
      <!-- 使用过渡效果来控制组件的进入和退出动画 -->
      <transition :mode="'out-in'" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
        <keep-alive>
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </RouterView>
  </el-config-provider>
</template>
<script setup lang="ts">
// 引入 Element Plus 的配置提供器
import { ElConfigProvider } from 'element-plus'
// 引入中文语言包
import { zhCn } from 'element-plus/es/locale/index.mjs'
// 引入路由视图组件
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
// 动画速度
.animate__animated {
  --animate-duration: 0s;
}
</style>
