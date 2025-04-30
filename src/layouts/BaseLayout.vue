<script lang="ts" setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";

</script>
<template>
  <TheHeader />

  <main class="container min-h-screen-nh py-8">
    <RouterView />
  </main>

  <TheFooter />
</template>
