<script setup lang="ts">
import Header from './components/Common/Header.vue';
</script>

<template>
  <div class="bg-orange-100" >
    <Header />
    <router-view class="px-8 py-4"/>
  </div>
</template>

<style scoped></style>
