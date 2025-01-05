import type { Exercise } from '@/schemas/exercises';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function fetchExercises(client: SupabaseClient): Promise<Exercise[]> {
	const { data: exercises, error } = await client.from('exercises').select('*');
	if (exercises && !error) {
		return exercises;
	} else {
		return [];
	}
}

export async function createExercise(client: SupabaseClient, exercise: Exercise) {
	const { data, error } = await client.from('exercises').insert([exercise]);
	if (data && !error) {
		return data;
	} else {
		return null;
	}
}

export async function updateExercise(client: SupabaseClient, exercise: Exercise) {
	const { data, error } = await client.from('exercises').upsert([exercise]);
	if (data && !error) {
		return data;
	} else {
		return null;
	}
}

export async function deleteExercise(client: SupabaseClient, exercise: Exercise) {
	const { data, error } = await client.from('exercises').delete().eq('id', exercise.id);
	if (data && !error) {
		return data;
	} else {
		return null;
	}
}
