import { writable } from "svelte/store";

export function createFilteredMovementTypesStore() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		set,
		update
	};
}

export const filteredMovementTypes = createFilteredMovementTypesStore();
