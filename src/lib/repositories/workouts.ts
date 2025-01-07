import type { Workout } from '@/schemas/workouts';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function fetchWorkouts(client: SupabaseClient): Promise<Workout[]> {
	const { data: workouts, error } = await client.from('workouts').select('*');
	if (!error) {
		return workouts;
	} else {
		throw error;
	}
}

export async function createWorkout(client: SupabaseClient, workout: Workout) {
	const { data, error } = await client.from('workouts').insert([workout]);
	if (data && !error) {
		return data;
	} else {
		throw error;
	}
}

export async function updateWorkout(client: SupabaseClient, workout: Workout) {
	const { data: returnedWorkout, error } = await client.from('workouts').upsert([workout]);
	if (returnedWorkout && !error) {
		return returnedWorkout;
	} else {
		throw error;
	}
}

export async function deleteWorkout(client: SupabaseClient, workout: Workout) {
	const { data, error } = await client.from('workouts').delete().eq('id', workout.id);
	if (data && !error) {
		return data;
	} else {
		throw error;
	}
}
