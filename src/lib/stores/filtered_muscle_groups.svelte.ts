import { writable } from "svelte/store";

export function createFilteredMuscleGroupsStore() {
	const { subscribe, set, update } = writable({
		muscle_groups: []
	});

	return {
		subscribe,
		set,
		update
	};
}

export const filteredMuscleGroups = createFilteredMuscleGroupsStore();
