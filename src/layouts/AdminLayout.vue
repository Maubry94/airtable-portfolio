<script setup lang="ts">
import AdminSideBar from "@/domains/admin/components/AdminSideBar.vue";
import AdminHeader from "@/domains/admin/components/AdminHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider :style="{ '--sidebar-width': '14rem' }">
    <AdminSideBar />
    <SidebarInset>
      <AdminHeader />

      <main class="container min-h-[calc(100vh-2*2rem)] py-8">
        <RouterView />
      </main>

      <TheFooter />
    </SidebarInset>
  </SidebarProvider>
</template>

