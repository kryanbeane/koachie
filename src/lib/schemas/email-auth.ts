import { z } from "zod";

export const emailPasswordAuthSchema = z.object({
	email: z.string().email().max(128),
	password: z.string()
});

export type EmailPassswordAuthSchema = z.infer<typeof emailPasswordAuthSchema>;
