<script setup lang="ts">
function getCurrentYear() {
	return new Date().getFullYear();
}
</script>

<template>
  <footer class="bg-white border-t border-gray-200 text-center py-6">
    <div class="container px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
      <p class="mb-2 sm:mb-0">
        © 2025 - {{ getCurrentYear() }} IW - Tous droits réservés
      </p>
    </div>
  </footer>
</template>
