<template>
  <div class="demo flex flex-col justify-center items-center">
    <Animation>
      <h1 class="mb-[20px] text-[36px]" :style="{ color: !darkModeStore.isDark ? '#333' : '#fff' }">{{ $t('projectTitle') }}</h1>
    </Animation>
    <div class="flex gap-[12px]">
      <el-radio-group v-model="curLang">
        <el-radio :value="'zh-cn'" size="large">中文</el-radio>
        <el-radio :value="'en'" size="large">English</el-radio>
      </el-radio-group>
      <span class="flex items-center gap-4"><ElSwitch :size="'small'" v-model="darkModeStore.isDark"></ElSwitch>{{ $t('darkMode') }}</span>
    </div>
    <ElCard>
      <div class="flex flex-col gap-[12px] leading-[1.3]">
        <div>{{ $t('env') }}: {{ VITE_APP_ENV }}</div>
        <div>{{ $t('appName') }}: {{ VITE_APP_NAME }}</div>
        <div>{{ $t('baseApiUrl') }}: {{ VITE_APP_BASE_API_URL }}</div>
      </div>
    </ElCard>
  </div>
</template>
<script lang="ts" setup>
import { curLang } from '@/i18n'
import { useDarkModeStore } from '@/stores'

const darkModeStore = useDarkModeStore()
const VITE_APP_ENV = import.meta.env.VITE_APP_ENV
const VITE_APP_NAME = import.meta.env.VITE_APP_NAME
const VITE_APP_BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL
</script>

<style lang="scss" scoped>
.demo {
  min-height: 100vh;
  width: 100%;
}
</style>
