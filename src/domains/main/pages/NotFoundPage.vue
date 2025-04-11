<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { TheButton } from "@/components/ui/button";

const { HOME_PAGE } = routerPageName;
</script>

<template>
  <section class="min-h-screen-nh flex flex-col items-center justify-center">
    <div class="text-center max-w-xl">
      <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
        Oups, page introuvable.
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Il semble que la page que vous cherchez n’existe pas (ou plus). Peut-être êtes-vous perdu ?
      </p>
      <TheButton
        as-child
        size="lg"
      >
        <RouterLink :to="{ name: HOME_PAGE }">
          Retour à l’accueil
        </RouterLink>
      </TheButton>
    </div>
  </section>
</template>
