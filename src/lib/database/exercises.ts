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
