import { z } from "zod";

export const baseSchema = z.object({
	id: z.string().uuid().optional(),
	created_at: z.string().datetime({ offset: true }).optional(),
	updated_at: z.string().datetime({ offset: true }).optional()
});

export { emailPasswordAuthSchema, type EmailPassswordAuthSchema } from "./email-auth";
