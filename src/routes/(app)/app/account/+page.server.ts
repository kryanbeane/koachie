import { fetchExercises } from "@/server/repositories/exercises";
import { fetchWorkouts } from "@/server/repositories/workouts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesData = await fetchExercises(supabase, undefined);
	const workoutData = await fetchWorkouts(supabase);

	return {
		numExercises: exercisesData.length,
		numWorkouts: workoutData.length
	};
};
