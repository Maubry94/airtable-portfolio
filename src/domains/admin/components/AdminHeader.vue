<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { TheButton } from "@/components/ui/button";
import { useAuth } from "@/domains/admin/composables/useAuth";

const { HOME_PAGE, MANAGE_PROJECTS_PAGE, LIKES_PAGE } = routerPageName;
const { logout, isAuthenticated } = useAuth();
</script>

<template>
  <header class="sticky top-0 z-50 bg-white backdrop-blur border-b border-gray-200 shadow-sm">
    <div class="container h-16 flex gap-4 items-center">
      <RouterLink
        :to="{ name: HOME_PAGE }"
        class="text-2xl font-bold text-gray-900 tracking-tight"
      >
        IW Portfolio
      </RouterLink>

      <div
        class="flex-1 flex items-center"
        :class="{
          'justify-end': !isAuthenticated,
          'justify-between': isAuthenticated,
        }"
      >
        <nav v-if="isAuthenticated">
          <TheButton
            as-child
            variant="ghost"
          >
            <RouterLink
              :to="{ name: MANAGE_PROJECTS_PAGE }"
            >
              Gestion des projets
            </RouterLink>
          </TheButton>

          <TheButton
            as-child
            variant="ghost"
          >
            <RouterLink
              :to="{ name: LIKES_PAGE }"
            >
              Répartition des likes
            </RouterLink>
          </TheButton>
        </nav>

        <div class="space-x-2">
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
          <TheButton
            v-if="isAuthenticated"
            variant="ghost"
            @click="logout"
          >
            Déconnexion
          </TheButton>
        </div>
      </div>
    </div>
  </header>
</template>
