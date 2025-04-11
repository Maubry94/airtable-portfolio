import { z } from "zod";

export const env = z
	.object({
		VITE_AIRTABLE_API_KEY: z.string(),
		VITE_AIRTABLE_BASE_URL: z.string().url(),
	})
	.readonly()
	.parse(import.meta.env);
