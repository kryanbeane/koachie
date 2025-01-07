import { fetchExercises } from '@/repositories/exercises';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesData = await fetchExercises(supabase);
	console.log('EXECISES DATA PAGE LOAD', exercisesData);
	return {
		exercises: exercisesData
	};
};
