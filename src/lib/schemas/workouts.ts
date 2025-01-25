import { z } from "zod";
import { baseSchema } from "./index";

export const workoutSchema = baseSchema.extend({
	coach_id: z.string().uuid().nullable().optional(),
	name: z.string().max(100).min(3, "Workout name must be over 5 characters!"),
	description: z.string().max(500)
});

export type Workout = z.infer<typeof workoutSchema>;

export const workoutAssignment = baseSchema.extend({
	client_id: z.string().uuid(),
	workout_id: z.string().uuid(),
	date: z.string().date()
});

export type WorkoutAssignment = z.infer<typeof workoutAssignment>;
