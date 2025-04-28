import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdmin = Object.freeze({
	LOGIN_PAGE: "login",
	MANAGE_PROJECTS_PAGE: "manage-projects",
	LIKES_PAGE: "likes",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameAdmin.LOGIN_PAGE,
		path: "/admin/login",
		component: () => import("./pages/LoginPage.vue"),
	},
	{
		name: routerPageNameAdmin.MANAGE_PROJECTS_PAGE,
		path: "/admin/projects",
		component: () => import("./pages/ProjectsPage.vue"),
	},
	{
		name: routerPageNameAdmin.LIKES_PAGE,
		path: "/admin/likes",
		component: () => import("./pages/LikesPage.vue"),
	},
];

