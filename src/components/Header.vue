<script setup>
import { useDark, useToggle } from '@vueuse/core'
import config from '@/config'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div px-6 py-3 f-b-c h-20>
    <a :href="config.link">
      <div inline-flex gap-5 items-center>
        <img h-6 w-6 :src="config.avatar" alt="avatar">
        <div text-6 font-bold>
          {{ config.title }}
        </div>
      </div>
    </a>
    <div inline-flex gap-5>
      <button i-carbon-sun dark:i-carbon-moon icon-btn @click="toggleDark()" />
      <a :href="config.repo" i-carbon-logo-github icon-btn />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
