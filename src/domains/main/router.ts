import type { RouteRecordRaw } from "vue-router";

export const routerPageNameMain = Object.freeze({
	HOME_PAGE: "home",
	PROJECTS_PAGE: "projects",
	PROJECT_DETAIL_PAGE: "project-detail",
	NOT_FOUND_PAGE: "not-found",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameMain.HOME_PAGE,
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	},
	{
		name: routerPageNameMain.PROJECTS_PAGE,
		path: "/projects",
		component: () => import("./pages/ProjectsPage.vue"),
	},
	{
		name: routerPageNameMain.PROJECT_DETAIL_PAGE,
		path: "/projects/:id",
		component: () => import("./pages/ProjectDetailPage.vue"),
	},
];

export function notFound(): RouteRecordRaw {
	return {
		path: "/:notFoundPath(.*)*",
		component: () => import("@/layouts/BaseLayout.vue"),
		children: [
			{
				name: routerPageNameMain.NOT_FOUND_PAGE,
				path: "/:notFoundPath(.*)*",
				component: () => import("./pages/NotFoundPage.vue"),
			},
		],
	};
}

