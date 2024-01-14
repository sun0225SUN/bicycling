<script setup>
import Map from '@/components/Map.vue'
import Header from '@/components/Header.vue'
import Summary from '@/components/Summary.vue'
import Details from '@/components/Details.vue'
</script>

<template>
  <Header />
  <div f-b-c>
    <Summary />
    <Map />
  </div>
  <Details />
  <!-- <RouterView /> -->
</template>

<style lang="scss" scoped></style>
