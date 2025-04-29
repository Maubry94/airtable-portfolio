import type { ComputedRef, Ref } from "vue";
import { createContext } from "reka-ui";

const COOKIE_CONFIG = {
	SECONDS: 60,
	MINUTES: 60,
	HOURS: 24,
	DAYS: 7,
};

export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE
	= COOKIE_CONFIG.SECONDS * COOKIE_CONFIG.MINUTES
	* COOKIE_CONFIG.HOURS * COOKIE_CONFIG.DAYS;
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export const [useSidebar, provideSidebarContext] = createContext<{
	state: ComputedRef<"expanded" | "collapsed">;
	open: Ref<boolean>;
	setOpen(value: boolean): void;
	isMobile: Ref<boolean>;
	openMobile: Ref<boolean>;
	setOpenMobile(value: boolean): void;
	toggleSidebar(): void;
}>("Sidebar");
