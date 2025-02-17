import { z } from "zod";
import { baseSchema } from "./index";

export const clientInviteSchema = baseSchema.extend({
	email: z.string().min(1, "Email is required").email("Invalid email").nonempty(),
	coach_id: z.string().uuid(),
	code: z.string()
});
export type ClientInvite = z.infer<typeof clientInviteSchema>;
