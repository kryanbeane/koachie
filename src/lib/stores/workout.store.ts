import type { Workout } from '@/schemas/workouts';
import { writable } from 'svelte/store';

type WorkoutStore = {
	selected: Workout['id'] | null;
};

function createWorkoutStore() {
	const store = writable<WorkoutStore>({ selected: '' });

	return {
		subscribe: store.subscribe,
		setWorkout: (id: Workout['id']) => {
			store.update((store) => ({ ...store, selected: id }));
		},
		clearWorkout: () => {
			store.update((store) => ({ ...store, selected: null }));
		}
	};
}

export const workoutStore = createWorkoutStore();
