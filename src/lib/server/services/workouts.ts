import type { SupabaseClient } from "@supabase/supabase-js";
import {
	createWorkout,
	deleteWorkout,
	fetchWorkouts,
	updateWorkout
} from "@/server/repositories/workouts";
import type { Workout } from "@/schemas/workouts";

export async function getWorkouts(supabase: SupabaseClient): Promise<Workout[]> {
	return await fetchWorkouts(supabase);
}

export async function addWorkout(supabase: SupabaseClient, workout: Workout): Promise<Workout[]> {
	const w = await createWorkout(supabase, workout);
	if (!w) {
		throw new Error("Failed to create workout");
	}
	return w;
}

export async function editWorkout(supabase: SupabaseClient, workout: Workout) {
	return await updateWorkout(supabase, workout);
}

export async function removeWorkout(supabase: SupabaseClient, workout: Workout) {
	return await deleteWorkout(supabase, workout);
}
