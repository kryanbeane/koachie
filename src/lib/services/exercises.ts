// service functions to call the database CRUD function for exercises

import type { Exercise } from '@/schemas/exercises';
import {
	createExercise,
	deleteExercise,
	fetchExercises,
	updateExercise
} from '@/repositories/exercises';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getExercises(supabase: SupabaseClient): Promise<Exercise[]> {
	const ex = await fetchExercises(supabase);
	console.log('SERVICE EXERCSES,', ex);
	return ex;
}

export async function addExercise(supabase: SupabaseClient, exercise: Exercise) {
	return await createExercise(supabase, exercise);
}

export async function editExercise(supabase: SupabaseClient, exercise: Exercise) {
	return await updateExercise(supabase, exercise);
}

export async function removeExercise(supabase: SupabaseClient, exercise: Exercise) {
	return await deleteExercise(supabase, exercise);
}
