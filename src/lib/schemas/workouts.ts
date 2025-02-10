import { z } from "zod";
import { baseSchema } from "./index";
import { experienceLevelEnum, modalityEnum } from "@/data/enums";

export const setPerformance = z.object({
	order: z.number().int().min(1),
	reps: z.number().int().min(0).nullable(),
	weight: z.number().int().min(0).nullable(),
	restTime: z.string().time()
});

export const workoutSchema = baseSchema.extend({
	coach_id: z.string().uuid().nullable().optional(),
	name: z.string().max(100).min(3, "Workout name must be over 5 characters!"),
	description: z.string().max(500),
	experience_level: experienceLevelEnum,
	modality: modalityEnum
});

export const exerciseInstanceSchema = baseSchema.extend({
	client_id: z.string().uuid().nullable().optional(),
	exercise_id: z.string().uuid().optional(),
	workout_id: z.string().uuid().optional(),
	performance: z.array(setPerformance)
});

export const workoutWithPerformance = workoutSchema.extend({
	exerciseInstances: exerciseInstanceSchema.array()
});

export const createWorkoutSchema = workoutSchema.extend({
	performance: setPerformance.array()
});

export const workoutAssignment = baseSchema.extend({
	client_id: z.string().uuid(),
	workout_id: z.string().uuid(),
	date: z.string().date()
});

export type WorkoutAssignment = z.infer<typeof workoutAssignment>;
export type WorkouWithPerformance = z.infer<typeof workoutWithPerformance>;
export type ExerciseInstance = z.infer<typeof exerciseInstanceSchema>;
export type Workout = z.infer<typeof workoutSchema>;
export type SetPerformance = z.infer<typeof setPerformance>;
