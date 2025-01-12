import { z } from 'zod';

/**
 * Exercise schema
 */

export const exerciseSchema = z.object({
	id: z.string().uuid().optional(),
	coach_id: z.string().uuid().nullable().optional(),
	created_at: z.string().datetime().optional(),
	updated_at: z.string().datetime().optional(),
	name: z.string().max(100),
	note: z.string().max(250),
	instructions: z.array(z.string().max(250)),
	muscle_groups: z.array(z.string().max(100)), //TODO change to enum
	movement_type: z.string().max(100), //TODO change to enum - eg. lower body hinge, upper body horizontal push, etc
	video: z.string()
});

export const createExerciseSchema = z.object({
	name: z.string().max(100),
	note: z.string().max(250),
	instructions: z.array(z.string().max(250)),
	muscle_groups: z.array(z.string().max(100)), //TODO change to enum
	movement_type: z.string().max(100), //TODO change to enum - eg. lower body hinge, upper body horizontal push, etc
	video: z.string()
});

export const updateExerciseSchema = z.object({
	// id: z.string().uuid().optional(),
	// coach_id: z.string().uuid().nullable().optional(),
	// created_at: z.string().datetime().optional(),
	// updated_at: z.string().datetime().optional(),
	name: z.string().max(100),
	note: z.string().max(250),
	instructions: z.array(z.string().max(250)),
	muscle_groups: z.array(z.string().max(100)), //TODO change to enum
	movement_type: z.string().max(100), //TODO change to enum - eg. lower body hinge, upper body horizontal push, etc
	video: z.string()
});

export type Exercise = z.infer<typeof exerciseSchema>;

export type CreateExercise = z.infer<typeof createExerciseSchema>;

export type UpdateExercise = z.infer<typeof updateExerciseSchema>;
/**
 * Exercise performance schemas
 */

const customVariableSchema = z.object({
	name: z.string().max(100),
	value: z.custom() // TODO: Add custom validation
});

export const exercisePerformanceSchema = z.array(
	z
		.object({
			order: z.number().int().min(1),
			reps: z.number().int().min(0),
			weight: z.number().int().min(0),
			restTime: z.string().time(),
			customVariables: z.array(customVariableSchema).max(3).optional()
		})
		.optional()
);

export type ExercisePerformance = z.infer<typeof exercisePerformanceSchema>;

type Json = ExercisePerformance | { [key: string]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() =>
	z.union([exercisePerformanceSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

/**
 * Exercise instance schema
 */

export const exerciseInstanceSchema = z.object({
	id: z.string().uuid(),
	client_id: z.string().uuid().nullable(),
	exercise_id: z.string().uuid(),
	workout_id: z.string().uuid(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	performance: exercisePerformanceSchema
});

export type ExerciseInstance = z.infer<typeof exerciseInstanceSchema>;
