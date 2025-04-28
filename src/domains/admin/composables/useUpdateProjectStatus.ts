import api from "@/lib/axios";
import { toast } from "vue-sonner";

export function useUpdateProjectStatus() {
	function updateProjectStatus(projectId: string, currentStatus?: string) {
		const newStatus = currentStatus === "Published" ? "Unpublished" : "Published";

		api.patch(`/Project/${projectId}`, {
			fields: {
				status: newStatus,
			},
		})
			.then((response) => response.data)
			.catch((error: unknown) => {
				toast("Erreur", {
					description: "Une erreur s'est produite lors de la mise à jour du statut du projet.",
					style: {
						backgroundColor: "red",
						color: "white",
					},
				});

				if (error instanceof Error) {
					throw new Error(`Error while updating data: ${error.message}`);
				}

				throw error;
			})
			.finally(() => {
				toast("Succès", {
					description: "Le statut du projet a été mis à jour avec succès.",
					style: {
						backgroundColor: "green",
						color: "white",
					},
				});
				window.location.reload();
			});
	}

	return {
		updateProjectStatus,
	};
}
