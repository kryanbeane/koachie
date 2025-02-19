import type { SupabaseClient } from "@supabase/supabase-js";

import type { ClientInvite } from "@/schemas/client_invites";

export async function createClientInvite(supabase: SupabaseClient, invite: ClientInvite) {
	return await supabase.from("client_invites").insert(invite);
}

export async function deleteClientInvite(supabase: SupabaseClient, invite: ClientInvite) {
	return await supabase.from("client_invites").delete().eq("id", invite.id);
}

export async function isClientInviteCreated(supabase: SupabaseClient, invite: ClientInvite) {
	return await supabase
		.from("client_invites")
		.select("*")
		.eq("email", invite.email)
		.eq("coach_id", invite.coach_id);
}

export async function fetchClientInvite(supabase: SupabaseClient, invite: ClientInvite) {
	return await supabase
		.from("client_invites")
		.select("*")
		.eq("email", invite.email)
		.eq("coach_id", invite.coach_id);
}
