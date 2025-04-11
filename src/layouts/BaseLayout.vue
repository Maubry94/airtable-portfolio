<script lang="ts" setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";

</script>
<template>
  <TheHeader />

  <main>
    <RouterView />
  </main>

  <TheFooter />
</template>
