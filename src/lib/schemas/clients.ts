import { z } from "zod";
import { baseSchema } from "./index";

export const clientSchema = baseSchema.extend({
	first_name: z.string().max(100),
	last_name: z.string().max(100),
	email: z.string().email(),
	coach_id: z.string().uuid(),
	DOB: z.string().max(10)
});
export type Client = z.infer<typeof clientSchema>;
