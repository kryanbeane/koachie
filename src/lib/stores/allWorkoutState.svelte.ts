import type { Workout } from '@/schemas/workouts';
import { getContext, setContext } from 'svelte';

export class AllWorkoutState {
	workouts = $state<Workout[]>([]);

	constructor() {}

	add(workout: Workout) {
		this.workouts.push(workout);
	}

	set(workouts: Workout[]) {
		this.workouts = workouts;
	}
}

const KEY = 'workouts';

export function setAllWorkoutState(): AllWorkoutState {
	return setContext(KEY, new AllWorkoutState());
}

export function getAllWorkoutState(): AllWorkoutState {
	return getContext<ReturnType<typeof setAllWorkoutState>>(KEY);
}
