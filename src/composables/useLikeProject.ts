import { ref } from "vue";
import api from "@/lib/axios";
import { type Like } from "@/schemas/like";

export function useLikeProject() {
	const isLiked = ref(false);

	function hasLikedProject(projectId: string): boolean {
		const likedProjects = JSON.parse(localStorage.getItem("likedProjects") || "[]") as string[];
		return likedProjects.includes(projectId);
	}

	function addLike(projectId: string) {
		isLiked.value = true;

		const likedProjects = JSON.parse(localStorage.getItem("likedProjects") || "[]") as string[];
		if (!likedProjects.includes(projectId)) {
			likedProjects.push(projectId);
			localStorage.setItem("likedProjects", JSON.stringify(likedProjects));
		}

		api.post("/Like", {
			fields: {
				project: [projectId],
			},
		}).catch((error: unknown) => {
			if (error instanceof Error) {
				throw new Error(`Error while fetching data: ${error.message}`);
			}
			throw error;
		});
	}

	async function removeLike(projectTitle: string, projectId: string) {
		try {
			const likedProjects = JSON.parse(localStorage.getItem("likedProjects") || "[]") as string[];
			const updatedProjects = likedProjects.filter((id) => id !== projectId);
			localStorage.setItem("likedProjects", JSON.stringify(updatedProjects));

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
		hasLikedProject,
	};
}
