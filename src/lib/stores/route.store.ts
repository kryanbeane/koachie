import { writable } from 'svelte/store';

export function createRouteStore() {
	const { subscribe, set, update } = writable<string>();

	return {
		subscribe,
		set,
		update
	};
}

export const routeStore = createRouteStore();
