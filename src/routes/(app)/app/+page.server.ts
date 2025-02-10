import { fetchNumExercises } from "@/server/repositories/exercises";
import { fetchNumWorkouts } from "@/server/repositories/workouts";
import { fetchNumClients } from "@/server/repositories/clients";
import type { PageServerLoad } from "./$types";
import { fetchClients } from "@/server/repositories/clients";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesCount = await fetchNumExercises(supabase);
	const workoutCount = await fetchNumWorkouts(supabase);
	const clientCount = await fetchNumClients(supabase);
	const clients = await fetchClients(supabase, "86d60b98-6321-4fe0-9180-365ccd0ec65d");

	return {
		numExercises: exercisesCount,
		numWorkouts: workoutCount,
		numClients: clientCount,
		clients: clients
	};
};
