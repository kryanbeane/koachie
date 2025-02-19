import type { Client } from "@/schemas/clients";
import { getContext, setContext } from "svelte";

export class SelectedClientState {
	Client = $state<Client | null>();

	constructor() {}

	set(Client: Client) {
		this.Client = Client;
	}

	clear() {
		this.Client = null;
	}
}

const KEY = "selectedClient";

export function setSelectedClientState(): SelectedClientState {
	return setContext(KEY, new SelectedClientState());
}

export function getSelectedClientState(): SelectedClientState {
	return getContext<ReturnType<typeof setSelectedClientState>>(KEY);
}
