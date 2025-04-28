import { z } from "zod";

const fieldsSchema = z.object({
	id: z.string().optional(),
	project: z.array(z.string()),
	likesCount: z.number().positive(),
	projectTitle: z.array(z.string()),
	projectStatus: z.array(z.string()),
});

export const likeSchema = z.object({
	id: z.string(),
	createdTime: z.string().datetime(),
	fields: fieldsSchema,
});

export type Like = z.infer<typeof likeSchema>;

export const likedProjectsSchema = z.array(z.string());
export type LikedProjects = z.infer<typeof likedProjectsSchema>;
