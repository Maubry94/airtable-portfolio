<script setup lang="ts">
import TheButton from "@/components/ui/button/TheButton.vue";

function click() {
	console.log("Clicked!");
}
</script>

<template>
  <div>
    <h1 class="text-red-500">
      Portfolio created with Airtable.
    </h1>

    <TheButton @click="click">
      Click me!
    </TheButton>
  </div>
</template>
