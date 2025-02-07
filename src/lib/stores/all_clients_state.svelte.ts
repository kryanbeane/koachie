import type { Client } from "@/schemas/clients";
import { getContext, setContext } from "svelte";

export class AllClientState {
	clients = $state<Client[]>([]);

	constructor() {}

	//TODO Add more robustness, ie. check if client already exists
	add(client: Client) {
		this.clients.push(client);
	}

	set(clients: Client[]) {
		this.clients = clients;
	}

	remove(clientId: string) {
		this.clients = this.clients.filter((w) => w.id !== clientId);
	}

	update(client: Client) {
		const index = this.clients.findIndex((e) => e.id === client.id);
		if (index !== -1) {
			this.clients[index] = client;
		}
	}
}

const KEY = "clients";

export function setAllClientState(): AllClientState {
	return setContext(KEY, new AllClientState());
}

export function getAllClientState(): AllClientState {
	return getContext<ReturnType<typeof setAllClientState>>(KEY);
}
