import type { SupabaseClient } from "@supabase/supabase-js";
import ExerciseInstanceRepository from "@/server/repositories/exercise_instances";
import type { ExerciseInstance } from "@/schemas/exercises";

class ExerciseInstanceService {
	private repository: ExerciseInstanceRepository;

	constructor(client: SupabaseClient) {
		this.repository = new ExerciseInstanceRepository(client);
	}

	async getExerciseInstances(coachId?: string): Promise<ExerciseInstance[]> {
		try {
			return await this.repository.fetchExerciseInstances(coachId);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	async addExerciseInstance(instance: ExerciseInstance): Promise<ExerciseInstance> {
		try {
			return await this.repository.createExerciseInstance(instance);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	async addExerciseInstances(instances: ExerciseInstance[]): Promise<ExerciseInstance[]> {
		try {
			return await this.repository.createExerciseInstances(instances);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	async editExerciseInstance(instance: ExerciseInstance): Promise<ExerciseInstance | undefined> {
		try {
			return await this.repository.updateExerciseInstance(instance);
		} catch (e) {
			console.error(e);
		}
	}

	async deleteExerciseInstances(instances: ExerciseInstance[]) {
		const ids = instances
			.map((instance) => instance.id)
			.filter((id): id is string => id !== undefined);

		const e = await this.repository.deleteExerciseInstances(ids);
		if (!e) {
			throw new Error("Failed to delete exercise");
		}
		return e;
	}
}

export default ExerciseInstanceService;
