import { ref } from "vue";
import api from "@/lib/axios";
import { type Like, type LikedProjects, likedProjectsSchema } from "@/schemas/like";
import { toast } from "vue-sonner";

const LIKE_CONFIG = {
	STORAGE: {
		LOCAL_STORAGE_KEY: "likedProjects",
		DEFAULT_VALUE: "[]",
	},
	RECORDS: {
		NO_RECORDS: 0,
		FIRST_RECORD: 0,
	},
	NOTIFICATION: {
		ERROR_TITLE: "Erreur",
		DELETE_ERROR_MESSAGE: "Une erreur s'est produite lors de la suppression du like.",
		ERROR_STYLE: {
			backgroundColor: "red",
			color: "white",
		},
	},
};

interface ApiResponse {
	records: Like[];
}

export function useLikeProject() {
	const isLiked = ref(false);

	function getLikedProjects(): LikedProjects {
		const { LOCAL_STORAGE_KEY, DEFAULT_VALUE } = LIKE_CONFIG.STORAGE;
		const stored = localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_VALUE;

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
			const { LOCAL_STORAGE_KEY } = LIKE_CONFIG.STORAGE;
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likedProjects));
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
			const { LOCAL_STORAGE_KEY } = LIKE_CONFIG.STORAGE;
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProjects));

			const formula = `AND(project = "${projectTitle}")`;

			const res = await api.get<ApiResponse>("/Like", {
				params: {
					filterByFormula: formula,
				},
			});

			const { NO_RECORDS, FIRST_RECORD } = LIKE_CONFIG.RECORDS;
			const records: Like[] = res.data.records || [];
			if (records.length === NO_RECORDS) {
				return;
			}

			await api.delete(`/Like/${records[FIRST_RECORD].id}`);
			isLiked.value = false;
		} catch (error: unknown) {
			if (error instanceof Error) {
				const { ERROR_TITLE, DELETE_ERROR_MESSAGE, ERROR_STYLE } = LIKE_CONFIG.NOTIFICATION;
				toast(ERROR_TITLE, {
					description: DELETE_ERROR_MESSAGE,
					style: ERROR_STYLE,
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
