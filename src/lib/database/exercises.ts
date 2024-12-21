import type { Exercise } from '@/schemas/exercises';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function fetchExercises(client: SupabaseClient): Promise<Exercise[]> {
	console.log('Fetching exercises');
	const { data: exercises, error } = await client.from('exercises').select('*');
	if (exercises && !error) {
		console.log('Exercises fetched successfully', exercises);
		return exercises;
	} else {
		console.error('Error fetching exercises with error: ', error);
		return [];
	}
}
