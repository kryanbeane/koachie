import type { SupabaseClient } from "@supabase/supabase-js";

import {
	createClientInvite,
	deleteClientInvite,
	fetchClientInvite,
	isClientInviteCreated
} from "@/server/repositories/client_invites";
import type { ClientInvite } from "@/schemas/client_invites";

export async function createClientInviteService(supabase: SupabaseClient, invite: ClientInvite) {
	const e = await createClientInvite(supabase, invite);
	if (!e) {
		throw new Error("Failed to add client invite");
	}
	return e;
}

export async function deleteClientInviteService(supabase: SupabaseClient, invite: ClientInvite) {
	const e = await deleteClientInvite(supabase, invite);
	if (!e) {
		throw new Error("Failed to delete client invite");
	}
	return e;
}

export async function isClientInviteCreatedService(supabase: SupabaseClient, invite: ClientInvite) {
	const e = await isClientInviteCreated(supabase, invite);
	if (!e) {
		throw new Error("Failed to delete client invite");
	}
	return e.data ? e.data.length > 0 : false;
}

export async function fetchClientInviteService(supabase: SupabaseClient, invite: ClientInvite) {
	const e = await fetchClientInvite(supabase, invite);
	if (!e) {
		throw new Error("Failed to fetch client invite");
	}
	return e;
}
