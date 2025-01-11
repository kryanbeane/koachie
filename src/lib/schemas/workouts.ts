import { z } from "zod";
import { baseSchema } from "./index";

export const workoutSchema = baseSchema.extend({
	coach_id: z.string().uuid().nullable().optional(),
	name: z.string().max(100),
	description: z.string().max(500)
});

export type Workout = z.infer<typeof workoutSchema>;

export const workoutAssignment = baseSchema.extend({
	client_id: z.string().uuid(),
	workout_id: z.string().uuid(),
	date: z.string().date()
});

export type WorkoutAssignment = z.infer<typeof workoutAssignment>;

export const createWorkoutFormSchema = baseSchema.extend({
	name: z.string().min(2).max(50),
	description: z.string().max(500)
});

export type CreateWorkoutFormSchema = typeof createWorkoutFormSchema;
