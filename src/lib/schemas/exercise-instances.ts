import { z } from 'zod';

/**
 * Exercise Instance schema
 */

export const exerciseInstanceSchema = z.object({
	id: z.string().uuid(),
	exerciseId: z.string().uuid(),
	clientId: z.string().uuid().nullable(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime()
});

export type ExerciseInstance = z.infer<typeof exerciseInstanceSchema>;
