import type { ExerciseInstance } from "@/schemas/workouts";
import type { SupabaseClient } from "@supabase/supabase-js";

class ExerciseInstanceRepository {
	private client: SupabaseClient;

	constructor(client: SupabaseClient) {
		this.client = client;
	}

	async fetchExerciseInstances(coachId?: string): Promise<ExerciseInstance[]> {
		let query = this.client.from("exercise_instances").select("*");
		if (coachId) {
			query = query.eq("coach_id", coachId);
		}

		const { data: instances, error } = await query;
		if (error) {
			throw error;
		}

		return instances;
	}

	async fetchExerciseInstanceByWorkoutId(workoutId: string): Promise<ExerciseInstance[]> {
		const query = this.client.from("exercise_instances").select("*").eq("workout_id", workoutId);
		const { data: instances, error } = await query;
		if (error) {
			throw error;
		}

		return instances;
	}

	async createExerciseInstance(instance: ExerciseInstance): Promise<ExerciseInstance> {
		const { data, error } = await this.client
			.from("exercise_instances")
			.insert([instance])
			.select("*");
		if (data && !error) {
			return data[0] as ExerciseInstance;
		} else {
			throw error;
		}
	}

	async createExerciseInstances(instances: ExerciseInstance[]): Promise<ExerciseInstance[]> {
		const { data, error } = await this.client
			.from("exercise_instances")
			.insert(instances)
			.select("*");
		if (data && !error) {
			return data as ExerciseInstance[];
		} else {
			throw error;
		}
	}

	async updateExerciseInstance(instance: ExerciseInstance): Promise<ExerciseInstance> {
		const { data, error } = await this.client
			.from("exercise_instances")
			.update([instance])
			.eq("id", instance.id)
			.select("*");
		if (data && !error) {
			return data[0] as ExerciseInstance;
		} else {
			throw error;
		}
	}

	async upsertExerciseInstances(instances: ExerciseInstance[]): Promise<ExerciseInstance[]> {
		const instancesToUpdate = instances.filter((inst) => inst.id);
		const instancesToInsert = instances.filter((inst) => !inst.id);

		console.log("UPDATE", instancesToUpdate);
		console.log("INSERT", instancesToInsert);

		const { data: updatedData, error: updateError } = await this.client
			.from("exercise_instances")
			.upsert(instancesToUpdate, { onConflict: "id" })
			.select("*");

		if (updateError) {
			throw updateError;
		}

		const { data: insertedData, error: insertError } = await this.client
			.from("exercise_instances")
			.insert(instancesToInsert)
			.select("*");

		if (insertError) {
			throw insertError;
		}

		return [...(updatedData || []), ...(insertedData || [])] as ExerciseInstance[];
	}

	async deleteExerciseInstances(ids: string[]): Promise<ExerciseInstance[]> {
		const { data, error } = await this.client
			.from("exercise_instances")
			.delete()
			.in("id", ids)
			.select("*");
		if (data && !error) {
			return data as ExerciseInstance[];
		} else {
			throw error;
		}
	}

	async countExerciseInstances(): Promise<number> {
		const { count, error } = await this.client
			.from("exercise_instances")
			.select("*", { count: "exact", head: true });

		if (!error) {
			return count ?? 0;
		} else {
			throw error;
		}
	}
}

export default ExerciseInstanceRepository;
