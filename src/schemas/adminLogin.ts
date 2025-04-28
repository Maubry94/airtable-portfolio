import { z } from "zod";

export const adminLoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;
