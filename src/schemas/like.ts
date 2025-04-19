import { z } from "zod";

const fieldsSchema = z.object({
	project: z.array(z.string()),
});

export const likeSchema = z.object({
	id: z.string(),
	createdTime: z.string().datetime(),
	fields: fieldsSchema,
});

export type Like = z.infer<typeof likeSchema>;
