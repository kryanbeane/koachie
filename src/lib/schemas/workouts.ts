import { z } from 'zod';

/**
 * Workout schema
 */

export const workoutSchema = z.object({
	id: z.string().uuid(),
	coach_id: z.string().uuid().nullable().optional(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	name: z.string().max(100),
	description: z.string().max(500)
});

export type Workout = z.infer<typeof workoutSchema>;

export const workoutAssignment = z.object({
	id: z.string().uuid(),
	client_id: z.string().uuid(),
	workout_id: z.string().uuid(),
	date: z.string().date(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime()
});

export type WorkoutAssignment = z.infer<typeof workoutAssignment>;

export const createWorkoutFormSchema = z.object({
	name: z.string().min(2).max(50),
	description: z.string().max(500)
});

export type CreateWorkoutFormSchema = typeof createWorkoutFormSchema;
