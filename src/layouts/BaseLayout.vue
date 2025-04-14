<script lang="ts" setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";

</script>
<template>
  <TheHeader />

  <main class="container py-8">
    <RouterView />
  </main>

  <TheFooter />
</template>
