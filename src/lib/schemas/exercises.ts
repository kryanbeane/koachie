import { z } from "zod";
import { baseSchema } from "./index";

/**
 * Exercise schema
 */

export const exerciseSchema = baseSchema.extend({
	coach_id: z.string().uuid().nullable().optional(),
	name: z.string().max(100),
	note: z.string().max(250),
	instructions: z.array(z.string().max(250)),
	muscle_groups: z.array(z.string().max(100)), //TODO change to enum
	movement_type: z.string().max(100), //TODO change to enum - eg. lower body hinge, upper body horizontal push, etc
	video: z.string()
});

export type Exercise = z.infer<typeof exerciseSchema>;

/**
 * Exercise performance schemas
 */

const customVariableSchema = baseSchema.extend({
	name: z.string().max(100),
	value: z.custom() // TODO: Add custom validation
});

export const setPerformance = z.object({
	order: z.number().int().min(1),
	reps: z.number().int().min(0).nullable(),
	weight: z.number().int().min(0).nullable(),
	restTime: z.string().time(),
	customVariables: z.array(customVariableSchema).max(3).optional()
});

export type SetPerformance = z.infer<typeof setPerformance>;

/**
 * Exercise instance schema
 */

export const exerciseInstanceSchema = baseSchema.extend({
	client_id: z.string().uuid().nullable(),
	exercise_id: z.string().uuid(),
	workout_id: z.string().uuid(),
	performance: z.array(setPerformance)
});

export type ExerciseInstance = z.infer<typeof exerciseInstanceSchema>;

export const createExerciseInstanceSchema = z.object({
	performance: z.array(setPerformance)
});

export type CreateExerciseInstance = z.infer<typeof createExerciseInstanceSchema>;
