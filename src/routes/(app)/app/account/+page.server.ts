import { fetchExercises } from "@/repositories/exercises";
import type { PageServerLoad } from "./$types";
import { fetchWorkouts } from "@/repositories/workouts";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesData = await fetchExercises(supabase);
	const workoutData = await fetchWorkouts(supabase);

	return {
		numExercises: exercisesData.length,
		numWorkouts: workoutData.length
	};
};
