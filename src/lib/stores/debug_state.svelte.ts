import { getContext, setContext } from "svelte";

export class DebugState {
	debug = $state<boolean>(false);

	constructor() {}

	toggle() {
		this.debug = !this.debug;
	}
}

const KEY = "debug";

export function setDebugState(): DebugState {
	return setContext(KEY, new DebugState());
}

export function getDebugState(): DebugState {
	return getContext<ReturnType<typeof setDebugState>>(KEY);
}
