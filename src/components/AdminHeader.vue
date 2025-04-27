<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { TheButton } from "@/components/ui/button";

const { HOME_PAGE } = routerPageName;
</script>

<template>
  <header class="sticky top-0 z-50 bg-white backdrop-blur border-b border-gray-200 shadow-sm">
    <div class="container h-16 flex items-center justify-between">
      <RouterLink
        :to="{ name: HOME_PAGE }"
        class="text-2xl font-bold text-gray-900 tracking-tight"
      >
        IW Portfolio
      </RouterLink>

      <nav class="flex gap-4 items-center">
        <TheButton
          as-child
          variant="outline"
        >
          <RouterLink
            :to="{ name: HOME_PAGE }"
          >
            Accueil
          </RouterLink>
        </TheButton>
      </nav>
    </div>
  </header>
</template>
