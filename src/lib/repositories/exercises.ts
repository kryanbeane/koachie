import type { Exercise } from "@/schemas/exercises";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function fetchExercises(client: SupabaseClient): Promise<Exercise[]> {
	const { data: exercises, error } = await client.from("exercises").select("*");
	if (!error) {
		return exercises;
	} else {
		throw error;
	}
}

export async function fetchNumExercises(client: SupabaseClient): Promise<number> {
	const { count, error } = await client
		.from("exercises")
		.select("*", { count: "exact", head: true });

	if (!error) {
		return count ?? 0;
	} else {
		throw error;
	}
}

export async function createExercise(
	client: SupabaseClient,
	exercise: Exercise
): Promise<Exercise[]> {
	const { data, error } = await client.from("exercises").insert([exercise]).select("*");
	if (data && !error) {
		return data as Exercise[];
	} else {
		throw error;
	}
}

export async function updateExercise(
	client: SupabaseClient,
	exercise: Exercise
): Promise<Exercise[]> {
	console.log("UPDATE EXERCISE", exercise);
	const { data, error } = await client
		.from("exercises")
		.update([exercise])
		.eq("id", exercise.id)
		.select("*");
	if (data && !error) {
		return data as Exercise[];
	} else {
		throw error;
	}
}

export async function deleteExercise(
	client: SupabaseClient,
	exercise: Exercise
): Promise<Exercise[]> {
	console.log("DELETE EXERCISE", exercise);
	const { data, error } = await client.from("exercises").delete().eq("id", exercise.id).select("*");
	if (data && !error) {
		return data as Exercise[];
	} else {
		throw error;
	}
}
