import { writable } from "svelte/store";

export function createFilteredSortMethodsStore() {
	const { subscribe, set, update } = writable({
		sort_by: ""
	});

	return {
		subscribe,
		set,
		update
	};
}

export const filteredSortMethods = createFilteredSortMethodsStore();
