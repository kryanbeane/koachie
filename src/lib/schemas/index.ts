import { z } from "zod";

export const baseSchema = z.object({
	id: z.string().uuid().optional(),
	created_at: z.string().datetime().optional(),
	updated_at: z.string().datetime().optional()
});

export { emailAuthSchema, type EmailAuthSchema } from "./email-auth";
