import type { Workout } from '@/schemas/workouts';
import { getContext, setContext } from 'svelte';

export class SelectedWorkoutState {
	workout = $state<Workout | null>();

	constructor() {}

	set(workout: Workout) {
		this.workout = workout;
	}

	clear() {
		this.workout = null;
	}
}

const KEY = 'selectedWorkout';

export function setSelectedWorkoutState(): SelectedWorkoutState {
	return setContext(KEY, new SelectedWorkoutState());
}

export function getSelectedWorkoutState(): SelectedWorkoutState {
	return getContext<ReturnType<typeof setSelectedWorkoutState>>(KEY);
}
