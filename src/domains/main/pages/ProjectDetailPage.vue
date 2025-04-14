<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";

const params = useRouteParams({
	id: z.string(),
});
</script>

<template>
  <section class="min-h-screen-nh flex flex-col items-center justify-center">
    <div class="text-center max-w-2xl">
      <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
        Project Detail Page
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Project ID: {{ params.id }}
      </p>
    </div>
  </section>
</template>
