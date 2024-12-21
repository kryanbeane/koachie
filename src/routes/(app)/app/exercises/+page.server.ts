import { fetchExercises } from '@/database/exercises';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesData = await fetchExercises(supabase);
	return {
		exercises: exercisesData
	};
};
