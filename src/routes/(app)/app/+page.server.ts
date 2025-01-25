import { fetchNumExercises } from "@/server/repositories/exercises";
import { fetchNumWorkouts } from "@/server/repositories/workouts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesCount = await fetchNumExercises(supabase);
	const workoutCount = await fetchNumWorkouts(supabase);

	return {
		numExercises: exercisesCount,
		numWorkouts: workoutCount
	};
};
