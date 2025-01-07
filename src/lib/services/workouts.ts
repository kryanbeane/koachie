import type { SupabaseClient } from '@supabase/supabase-js';
import {
	createWorkout,
	deleteWorkout,
	fetchWorkouts,
	updateWorkout
} from '@/repositories/workouts';
import type { Workout } from '@/schemas/workouts';

export async function getWorkouts(supabase: SupabaseClient): Promise<Workout[]> {
	const workout = await fetchWorkouts(supabase);
	console.log('SERVICE WORKOUTS,', workout);
	return workout;
}

export async function addWorkout(supabase: SupabaseClient, workout: Workout) {
	return await createWorkout(supabase, workout);
}

export async function editWorkout(supabase: SupabaseClient, workout: Workout) {
	return await updateWorkout(supabase, workout);
}

export async function removeWorkout(supabase: SupabaseClient, workout: Workout) {
	return await deleteWorkout(supabase, workout);
}
