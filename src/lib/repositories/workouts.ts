import type { Workout } from "@/schemas/workouts";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function fetchWorkouts(client: SupabaseClient): Promise<Workout[]> {
	const { data: workouts, error } = await client.from("workouts").select("*");
	if (!error) {
		return workouts;
	} else {
		throw error;
	}
}

export async function fetchNumWorkouts(client: SupabaseClient): Promise<number> {
	const { count, error } = await client
		.from("workouts")
		.select("*", { count: "exact", head: true });

	if (!error) {
		return count ?? 0;
	} else {
		throw error;
	}
}

export async function createWorkout(client: SupabaseClient, workout: Workout): Promise<Workout[]> {
	const { data, error } = await client.from("workouts").insert([workout]).select("*");
	if (data && !error) {
		return data as Workout[];
	} else {
		throw error;
	}
}

export async function updateWorkout(client: SupabaseClient, workout: Workout) {
	const { data: returnedWorkout, error } = await client
		.from("workouts")
		.upsert([workout])
		.select("*");
	if (returnedWorkout && !error) {
		return returnedWorkout;
	} else {
		throw error;
	}
}

export async function deleteWorkout(client: SupabaseClient, workout: Workout) {
	const { data, error } = await client.from("workouts").delete().eq("id", workout.id).select("*");
	if (data && !error) {
		return data;
	} else {
		throw error;
	}
}
