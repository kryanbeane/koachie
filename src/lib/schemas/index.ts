import { z } from "zod";

export const baseSchema = z.object({
	id: z.string().uuid(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime()
});

export { emailAuthSchema, type EmailAuthSchema } from "./email-auth";
