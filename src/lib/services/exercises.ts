// service functions to call the database CRUD function for exercises

import type { Exercise } from "@/schemas/exercises";
import {
	createExercise,
	deleteExercise,
	fetchExercises,
	updateExercise
} from "@/repositories/exercises";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getExercises(
	supabase: SupabaseClient,
	coachId: string | undefined
): Promise<Exercise[]> {
	return await fetchExercises(supabase, coachId);
}

export async function addExercise(supabase: SupabaseClient, exercise: Exercise) {
	const e = await createExercise(supabase, exercise);
	if (!e) {
		throw new Error("Failed to add exercise");
	}
	return e;
}

export async function editExercise(supabase: SupabaseClient, exercise: Exercise) {
	const e = await updateExercise(supabase, exercise);
	if (!e) {
		throw new Error("Failed to update exercise");
	}
	return e;
}

export async function removeExercise(supabase: SupabaseClient, exercise: Exercise) {
	const e = await deleteExercise(supabase, exercise);
	if (!e) {
		throw new Error("Failed to delete exercise");
	}
	return e;
}
