import { ref } from "vue";
import api from "@/lib/axios";
import { type Like } from "@/schemas/like";

export function useLikeProject() {
	const isLiked = ref(false);

	function addLike(projectId: string) {
		isLiked.value = true;

		api.post("/Like", {
			fields: {
				project: [projectId],
			},
		})
			.then(() => {
				isLiked.value = true;
			})
			.catch((error: unknown) => {
				if (error instanceof Error) {
					throw new Error(`Error while fetching data: ${error.message}`);
				}
				throw error;
			});
	}

	async function removeLike(projectTitle: string) {
		try {
			const formula = `AND(project = "${projectTitle}")`;

			const res = await api.get<{ records: Like[] }>("/Like", {
				params: {
					filterByFormula: formula,
				},
			});

			const NO_RECORDS = 0;
			const records: Like[] = res.data.records || [];
			if (records.length === NO_RECORDS) {
				return;
			}

			const FIRST_RECORD = 0;
			await api.delete(`/Like/${records[FIRST_RECORD].id}`);
			isLiked.value = false;
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error while removing like: ${error.message}`);
			}
			throw error;
		}
	}

	return {
		isLiked,
		addLike,
		removeLike,
	};
}
