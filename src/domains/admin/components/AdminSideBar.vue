<script setup lang="ts">
import { useAuth } from "@/domains/admin/composables/useAuth";
import { routerPageName } from "@/router/routerPageName";
import { LogIn, PenBox, ChartColumn } from "lucide-vue-next";
import {
	TheSidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	type SidebarProps,
	SidebarRail,
} from "@/components/ui/sidebar";

const props = defineProps<SidebarProps>();

const { LOGIN_PAGE, MANAGE_PROJECTS_PAGE, LIKES_PAGE } = routerPageName;
const { isAuthenticated } = useAuth();

const unloggedItems = [
	{
		title: "Se connecter",
		routeName: LOGIN_PAGE,
		icon: LogIn,
	},
];

const loggedItems = [
	{
		title: "Gestion des projets",
		routeName: MANAGE_PROJECTS_PAGE,
		icon: PenBox,
	},
	{
		title: "Répartition des likes",
		routeName: LIKES_PAGE,
		icon: ChartColumn,
	},
];
</script>
<template>
  <TheSidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <RouterLink
          class="flex items-center p-2"
          :to="{ name: MANAGE_PROJECTS_PAGE }"
        >
          <img
            src="/images/logo.webp"
            alt="Logo"
            class="size-8"
          >

          <span class="text-2xl font-bold text-gray-900 tracking-tight">IW Portfolio</span>
        </RouterLink>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem
            v-for="item in isAuthenticated ? loggedItems : unloggedItems"
            :key="item.title"
          >
            <SidebarMenuButton as-child>
              <RouterLink :to="{ name: item.routeName }">
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </TheSidebar>
</template>
