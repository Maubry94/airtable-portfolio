import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdmin = Object.freeze({
	MANAGE_PROJECTS_PAGE: "manage-projects",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameAdmin.MANAGE_PROJECTS_PAGE,
		path: "/admin/projects",
		component: () => import("./pages/ProjectsPage.vue"),
	},
];

