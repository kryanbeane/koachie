import type { Client } from "@/schemas/clients";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function fetchClients(
	client: SupabaseClient,
	coachId: string | undefined
): Promise<Client[]> {
	if (!coachId) {
		const { data: clients, error } = await client.from("clients").select("*");
		if (!error) {
			return clients;
		} else {
			throw error;
		}
	} else {
		const { data: clients, error } = await client
			.from("clients")
			.select("*")
			.eq("coach_id", coachId);
		if (!error) {
			return clients;
		} else {
			throw error;
		}
	}
}

export async function fetchNumClients(client: SupabaseClient): Promise<number> {
	const { count, error } = await client.from("clients").select("*", { count: "exact", head: true });

	if (!error) {
		return count ?? 0;
	} else {
		throw error;
	}
}

export async function fetchMostRecentClients(client: SupabaseClient): Promise<Client[]> {
	const { data: clients, error } = await client
		.from("clients")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(5);
	if (!error) {
		return clients;
	} else {
		throw error;
	}
}
