import { type ZodObject, type ZodTypeAny, type infer as zodInfer, z } from "zod";
import { type Ref, computed } from "vue";
import { routerPageName } from "@/router/routerPageName";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";

export function useRouteParams<
	T extends Record<string, ZodTypeAny>,
>(objectSchemas: T): Ref<zodInfer<ZodObject<T>>> {
	const route = useRoute();
	const router = useRouter();
	const currentRouteName = route.name;

	const params = computed(() => {
		const zodSchema = z.object(objectSchemas);

		if (currentRouteName !== route.name) {
			throw new Error("Route change.");
		}

		const result = zodSchema.safeParse(route.params);

		if (!result.success) {
			void router.push({ name: routerPageName.HOME_PAGE });

			toast("Erreur", {
				description: "Une erreur s'est produite lors de la récupération des paramètres de la route.",
				style: {
					backgroundColor: "red",
					color: "white",
				},
			});

			throw new Error("Params is invalid.");
		}

		return result.data;
	});

	return params;
}
