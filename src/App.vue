<script setup lang="ts">
import Header from './components/Common/Header.vue';
</script>

<template>
  <div class="bg-orange-50" >
    <Header />
    <router-view class="p-2"/>
  </div>
</template>

<style scoped></style>
