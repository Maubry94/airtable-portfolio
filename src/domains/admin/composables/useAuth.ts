import { ref } from "vue";
import { useRouter } from "vue-router";
import { type AdminLoginData } from "@/schemas/adminLogin";
import api from "@/lib/axios";
import { toast } from "vue-sonner";
import * as bcrypt from "bcryptjs";

interface AdminUserResponse {
	records: {
		id: string;
		fields: {
			email: string;
			password: string;
		};
	}[];
}

const isAuthenticated = ref(!!localStorage.getItem("admin_token"));

export function useAuth() {
	const router = useRouter();
	const isSubmitting = ref(false);

	async function login(formData: AdminLoginData) {
		try {
			isSubmitting.value = true;

			const response = await api.get<AdminUserResponse>("/Admin", {
				params: {
					filterByFormula: `email="${formData.email}"`,
				},
			});

			const users = response.data.records;

			const NO_USER = 0;
			if (users.length === NO_USER) {
				toast("Erreur", {
					description: "Email ou mot de passe incorrect",
					style: {
						backgroundColor: "red",
						color: "white",
					},
				});
				return false;
			}

			const [user] = users;

			const isPasswordValid = await bcrypt.compare(formData.password, user.fields.password);

			if (!isPasswordValid) {
				toast("Erreur", {
					description: "Email ou mot de passe incorrect",
					style: {
						backgroundColor: "red",
						color: "white",
					},
				});
				return false;
			}

			isAuthenticated.value = true;
			localStorage.setItem("admin_token", user.id);
			toast("Succès", {
				description: "Connexion réussie",
				style: {
					backgroundColor: "green",
					color: "white",
				},
			});

			await router.push({ name: "manage-projects" });

			return true;
		} catch (error: unknown) {
			toast("Erreur", {
				description: "Une erreur est survenue lors de la connexion",
				style: {
					backgroundColor: "red",
					color: "white",
				},
			});

			if (error instanceof Error) {
				throw new Error(`Error while updating data: ${error.message}`);
			}

			throw error;
		} finally {
			isSubmitting.value = false;
		}
	}

	async function logout() {
		isAuthenticated.value = false;
		localStorage.removeItem("admin_token");
		await router.push({ name: "login" });
	}

	return {
		isSubmitting,
		isAuthenticated,
		login,
		logout,
	};
}
