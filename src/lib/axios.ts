import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_AIRTABLE_BASE_URL,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
	},
});

export default api;
