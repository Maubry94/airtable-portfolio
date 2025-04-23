import { routerPageNameMain } from "@/domains/main/router";
import { routerPageNameAdmin } from "@/domains/admin/router";

export const routerPageName = Object.freeze({
	...routerPageNameMain,
	...routerPageNameAdmin,
});
