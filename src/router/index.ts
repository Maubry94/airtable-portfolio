import { createRouter, createWebHistory } from "vue-router";
import main, { notFound } from "@/domains/main/router";
import admin from "@/domains/admin/router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [...main()],
		},
		{
			path: "/admin",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [...admin()],
		},
		notFound(),
	],
});

export default router;
