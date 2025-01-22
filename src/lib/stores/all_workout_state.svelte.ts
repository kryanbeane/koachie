import type { Workout } from "@/schemas/workouts";
import { getContext, setContext } from "svelte";

export class AllWorkoutState {
	workouts = $state<Workout[]>([]);

	constructor() {}

	//TODO Add more robustness, ie. check if workout already exists
	add(workout: Workout) {
		this.workouts.push(workout);
	}

	set(workouts: Workout[]) {
		this.workouts = workouts;
	}

	update(workout: Workout) {
		const index = this.workouts.findIndex((w) => w.id === workout.id);
		if (index !== -1) {
			this.workouts[index] = workout;
		}
	}

	remove(workout: Workout) {
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
