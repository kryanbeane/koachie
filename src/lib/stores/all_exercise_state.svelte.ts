import type { Exercise } from '@/schemas/exercises';
import { getContext, setContext } from 'svelte';

export class AllExerciseState {
	exercises = $state<Exercise[]>([]);

	constructor() {}

	//TODO Add more robustness, ie. check if exercise already exists
	add(exercise: Exercise) {
		this.exercises.push(exercise);
	}

	set(exercises: Exercise[]) {
		this.exercises = exercises;
	}

	remove(exerciseId: string) {
		this.exercises = this.exercises.filter((w) => w.id !== exerciseId);
	}

	update(exercise: Exercise) {
		const index = this.exercises.findIndex((e) => e.id === exercise.id);
		if (index !== -1) {
			this.exercises[index] = exercise;
		}
	}
}

const KEY = 'exercises';

export function setAllExerciseState(): AllExerciseState {
	return setContext(KEY, new AllExerciseState());
}

export function getAllExerciseState(): AllExerciseState {
	return getContext<ReturnType<typeof setAllExerciseState>>(KEY);
}
