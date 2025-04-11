import { z } from "zod";

const thumbnailSchema = z.object({
	url: z.string().url(),
	width: z.number().positive(),
	height: z.number().positive(),
});

const thumbnailsSchema = z.object({
	small: thumbnailSchema,
	large: thumbnailSchema,
	full: thumbnailSchema,
});

const projectMediaItemSchema = z.object({
	id: z.string(),
	width: z.number().positive(),
	height: z.number().positive(),
	url: z.string().url(),
	filename: z.string(),
	size: z.number().positive(),
	type: z.string(),
	thumbnails: thumbnailsSchema,
});

const fieldsSchema = z.object({
	title: z.string(),
	description: z.string(),
	status: z.string(),
	image: z.array(projectMediaItemSchema),
	studentNames: z.array(z.string()),
	studentCount: z.number(),
	technologyNames: z.array(z.string()),
	technologyCount: z.number(),
	nbLikes: z.number(),
	summary: z.object({
		value: z.string(),
	}),
	keywords: z.object({
		value: z.string(),
	}),
});

export const projectSchema = z.object({
	id: z.string(),
	createdTime: z.string().datetime(),
	fields: fieldsSchema,
});

export type Project = z.infer<typeof projectSchema>;
