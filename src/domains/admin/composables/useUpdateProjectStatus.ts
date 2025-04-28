import api from "@/lib/axios";
import { toast } from "vue-sonner";

const STATUS_CONFIG = {
	PROJECT: {
		PUBLISHED: "Published",
		UNPUBLISHED: "Unpublished",
	},
	NOTIFICATION: {
		TITLES: {
			ERROR: "Erreur",
			SUCCESS: "Succès",
		},
		MESSAGES: {
			UPDATE_ERROR: "Une erreur s'est produite lors de la mise à jour du statut du projet.",
			UPDATE_SUCCESS: "Le statut du projet a été mis à jour avec succès.",
		},
		STYLES: {
			ERROR: {
				backgroundColor: "red",
				color: "white",
			},
			SUCCESS: {
				backgroundColor: "green",
				color: "white",
			},
		},
	},
};

export function useUpdateProjectStatus() {
	function updateProjectStatus(projectId: string, currentStatus?: string) {
		const { PUBLISHED, UNPUBLISHED } = STATUS_CONFIG.PROJECT;
		const newStatus = currentStatus === PUBLISHED ? UNPUBLISHED : PUBLISHED;

		api.patch(`/Project/${projectId}`, {
			fields: {
				status: newStatus,
			},
		})
			.then((response) => response.data)
			.catch((error: unknown) => {
				const { TITLES, MESSAGES, STYLES } = STATUS_CONFIG.NOTIFICATION;
				toast(TITLES.ERROR, {
					description: MESSAGES.UPDATE_ERROR,
					style: STYLES.ERROR,
				});

				if (error instanceof Error) {
					throw new Error(`Error while updating data: ${error.message}`);
				}

				throw error;
			})
			.finally(() => {
				const { TITLES, MESSAGES, STYLES } = STATUS_CONFIG.NOTIFICATION;
				toast(TITLES.SUCCESS, {
					description: MESSAGES.UPDATE_SUCCESS,
					style: STYLES.SUCCESS,
				});
				window.location.reload();
			});
	}

	return {
		updateProjectStatus,
	};
}
