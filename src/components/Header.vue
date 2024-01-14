<script setup>
import { useDark, useToggle } from '@vueuse/core'
import config from '@/config'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div f-b-c px-6 py-3 h-20>
    <a :href="config.link">
      <div inline-flex gap-5 items-center>
        <img h-6 w-6 :src="config.avatar" alt="avatar">
        <div text-6 font-bold>
          {{ config.title }}
        </div>
      </div>
    </a>
    <div inline-flex gap-5>
      <button icon-btn i-carbon-sun dark:i-carbon-moon @click="toggleDark()" />
      <a :href="config.repo" icon-btn i-carbon-logo-github />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
