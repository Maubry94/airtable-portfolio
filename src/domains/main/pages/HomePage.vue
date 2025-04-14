
<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import TheButton from "@/components/ui/button/TheButton.vue";

const { PROJECTS_PAGE } = routerPageName;
</script>

<template>
  <section class="min-h-screen-nh flex flex-col items-center justify-center">
    <div class="text-center max-w-2xl">
      <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
        Portfolio des IW
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Découvrez les projets réalisés par les étudiants de la filière Ingénierie du Web :
        idées innovantes, technos modernes et passion au rendez-vous.
      </p>
      <TheButton
        as-child
        size="lg"
      >
        <RouterLink :to="{ name: PROJECTS_PAGE }">
          Découvrir les projets
        </RouterLink>
      </TheButton>
    </div>
  </section>
</template>

