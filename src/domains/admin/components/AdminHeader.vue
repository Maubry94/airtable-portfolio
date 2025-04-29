<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TheButton } from "@/components/ui/button";
import { useAuth } from "@/domains/admin/composables/useAuth";

const { HOME_PAGE } = routerPageName;
const { logout, isAuthenticated } = useAuth();
</script>

<template>
  <header class="sticky top-0 z-5 bg-white backdrop-blur border-b border-gray-200 shadow-sm">
    <div class="container h-16 flex gap-4 justify-between items-center">
      <SidebarTrigger />

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
  </header>
</template>
