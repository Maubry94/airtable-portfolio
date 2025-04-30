<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { TheButton } from "@/components/ui/button";

const { HOME_PAGE, PROJECTS_PAGE, MANAGE_PROJECTS_PAGE } = routerPageName;
</script>

<template>
  <header class="sticky top-0 z-50 h-16 bg-white backdrop-blur border-b border-gray-200 shadow-sm">
    <div class="container h-full flex gap-4 items-center">
      <RouterLink
        :to="{ name: HOME_PAGE }"
        class="text-2xl font-bold text-gray-900 tracking-tight"
      >
        IW Portfolio
      </RouterLink>

      <nav class="flex-1 flex justify-between items-center">
        <TheButton
          as-child
          variant="ghost"
        >
          <RouterLink
            :to="{ name: PROJECTS_PAGE }"
          >
            Projets
          </RouterLink>
        </TheButton>

        <TheButton
          as-child
          variant="outline"
        >
          <RouterLink
            :to="{ name: MANAGE_PROJECTS_PAGE }"
          >
            Admin
          </RouterLink>
        </TheButton>
      </nav>
    </div>
  </header>
</template>
