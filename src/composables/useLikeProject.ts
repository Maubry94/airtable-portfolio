import { ref } from "vue";
import api from "@/lib/axios";
import { type Like, type LikedProjects, likedProjectsSchema } from "@/schemas/like";
import { toast } from "vue-sonner";

interface ApiResponse {
	records: Like[];
}

export function useLikeProject() {
	const isLiked = ref(false);

	function getLikedProjects(): LikedProjects {
		const stored = localStorage.getItem("likedProjects") || "[]";

		try {
			return likedProjectsSchema.parse(JSON.parse(stored));
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Invalid stored liked projects format: ${error.message}`);
			}

			throw error;
		}
	}

	function hasLikedProject(projectId: string): boolean {
		const likedProjects = getLikedProjects();
		return likedProjects.includes(projectId);
	}

	function addLike(projectId: string) {
		isLiked.value = true;

		const likedProjects = getLikedProjects();
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
			const likedProjects = getLikedProjects();
			const updatedProjects = likedProjects.filter((id) => id !== projectId);
			localStorage.setItem("likedProjects", JSON.stringify(updatedProjects));

			const formula = `AND(project = "${projectTitle}")`;

			const res = await api.get<ApiResponse>("/Like", {
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
				toast("Erreur", {
					description: "Une erreur s'est produite lors de la suppression du like.",
					style: {
						backgroundColor: "red",
						color: "white",
					},
				});

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
