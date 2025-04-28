import { ref } from "vue";
import { useRouter } from "vue-router";
import { type AdminLoginData } from "@/schemas/adminLogin";
import api from "@/lib/axios";
import { toast } from "vue-sonner";
import * as bcrypt from "bcryptjs";

const AUTH_CONFIG = {
	STORAGE: {
		ADMIN_TOKEN_KEY: "admin_token",
	},
	USERS: {
		NO_USERS: 0,
		ARRAY_FIRST: 0,
	},
	NOTIFICATION: {
		TITLES: {
			ERROR: "Erreur",
			SUCCESS: "Succès",
		},
		MESSAGES: {
			INVALID_CREDENTIALS: "Email ou mot de passe incorrect",
			LOGIN_ERROR: "Une erreur est survenue lors de la connexion",
			LOGIN_SUCCESS: "Connexion réussie",
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

interface AdminUserResponse {
	records: {
		id: string;
		fields: {
			email: string;
			password: string;
		};
	}[];
}

const isAuthenticated = ref(!!localStorage.getItem(AUTH_CONFIG.STORAGE.ADMIN_TOKEN_KEY));

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

			if (users.length === AUTH_CONFIG.USERS.NO_USERS) {
				const { TITLES, MESSAGES, STYLES } = AUTH_CONFIG.NOTIFICATION;
				toast(TITLES.ERROR, {
					description: MESSAGES.INVALID_CREDENTIALS,
					style: STYLES.ERROR,
				});
				return false;
			}

			const [user] = users;

			const isPasswordValid = await bcrypt.compare(formData.password, user.fields.password);

			if (!isPasswordValid) {
				const { TITLES, MESSAGES, STYLES } = AUTH_CONFIG.NOTIFICATION;
				toast(TITLES.ERROR, {
					description: MESSAGES.INVALID_CREDENTIALS,
					style: STYLES.ERROR,
				});
				return false;
			}

			isAuthenticated.value = true;
			localStorage.setItem(AUTH_CONFIG.STORAGE.ADMIN_TOKEN_KEY, user.id);

			const { TITLES, MESSAGES, STYLES } = AUTH_CONFIG.NOTIFICATION;
			toast(TITLES.SUCCESS, {
				description: MESSAGES.LOGIN_SUCCESS,
				style: STYLES.SUCCESS,
			});

			await router.push({ name: "manage-projects" });

			return true;
		} catch (error: unknown) {
			const { TITLES, MESSAGES, STYLES } = AUTH_CONFIG.NOTIFICATION;
			toast(TITLES.ERROR, {
				description: MESSAGES.LOGIN_ERROR,
				style: STYLES.ERROR,
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
		localStorage.removeItem(AUTH_CONFIG.STORAGE.ADMIN_TOKEN_KEY);
		await router.push({ name: "login" });
	}

	return {
		isSubmitting,
		isAuthenticated,
		login,
		logout,
	};
}
