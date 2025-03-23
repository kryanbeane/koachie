import type { CreateWorkoutSchema } from "@/schemas/workouts";
import { getContext, setContext } from "svelte";

export class AllWorkoutState {
	workouts = $state<CreateWorkoutSchema[]>([]);

	constructor() {}

	//TODO Add more robustness, ie. check if workout already exists
	add(workout: CreateWorkoutSchema) {
		this.workouts.push(workout);
	}

	set(workouts: CreateWorkoutSchema[]) {
		this.workouts = workouts;
	}

	update(workout: CreateWorkoutSchema) {
		const index = this.workouts.findIndex((w) => w.id === workout.id);
		if (index !== -1) {
			this.workouts[index] = workout;
		}
	}

	findById(id: string): CreateWorkoutSchema | undefined {
		return this.workouts.find((w) => w.id === id);
	}

	remove(workout: CreateWorkoutSchema) {
		this.workouts = this.workouts.filter((w) => w.id !== workout.id);
	}
}

const KEY = "workouts";

export function setAllWorkoutState(): AllWorkoutState {
	return setContext(KEY, new AllWorkoutState());
}

export function getAllWorkoutState(): AllWorkoutState {
	return getContext<ReturnType<typeof setAllWorkoutState>>(KEY);
}
