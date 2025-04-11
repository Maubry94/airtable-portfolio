<script setup lang="ts">
import { TheButton } from "@/components/ui/button";
</script>

<template>
  <header class="sticky top-0 z-50 bg-white backdrop-blur border-b border-gray-200 shadow-sm">
    <div class="container h-16 flex items-center justify-between">
      <a
        href="/"
        class="text-2xl font-bold text-gray-900 tracking-tight"
      >
        5IW3 Portfolio
      </a>

      <nav class="flex gap-4 items-center">
        <TheButton
          as-child
          variant="ghost"
        >
          <a href="/projects">Projets</a>
        </TheButton>
        <TheButton
          as-child
          variant="outline"
        >
          <a href="/admin">Admin</a>
        </TheButton>
      </nav>
    </div>
  </header>
</template>
