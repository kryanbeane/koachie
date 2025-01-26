import { writable } from "svelte/store";

export function createFilteredMovementTypesStore() {
	const { subscribe, set, update } = writable({
		movement_type: ""
	});

	return {
		subscribe,
		set,
		update
	};
}

export const filteredMovementTypes = createFilteredMovementTypesStore();
