import type { Router } from "vue-router";
import { routerPageNameAdmin } from "@/domains/admin/router";

export function setupAuthGuard(router: Router) {
	router.beforeEach((to, from, next) => {
		const isAdminRoute = to.path.startsWith("/admin") && to.name !== routerPageNameAdmin.LOGIN_PAGE;
		const isLoginPage = to.name === routerPageNameAdmin.LOGIN_PAGE;
		const isAuthenticated = !!localStorage.getItem("admin_token");

		if (isAdminRoute && !isAuthenticated) {
			next({ name: routerPageNameAdmin.LOGIN_PAGE });
		} else if (isLoginPage && isAuthenticated) {
			next({ name: routerPageNameAdmin.MANAGE_PROJECTS_PAGE });
		} else {
			next();
		}
	});
}
