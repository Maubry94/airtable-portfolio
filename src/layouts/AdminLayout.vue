<script lang="ts" setup>
import TheFooter from "@/components/TheFooter.vue";
import AdminHeader from "@/components/AdminHeader.vue";

</script>
<template>
  <AdminHeader />

  <main class="container min-h-[calc(100vh-2*2rem)] py-8">
    <RouterView />
  </main>

  <TheFooter />
</template>
