import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<unknown>>(updaterOrValue: T, ref: Ref) {
	ref.value = typeof updaterOrValue === "function"
		? (updaterOrValue as (prevValue: unknown) => unknown)(ref.value)
		: updaterOrValue;
}
