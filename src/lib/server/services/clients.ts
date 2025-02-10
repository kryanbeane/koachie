import type { SupabaseClient } from "@supabase/supabase-js";

import { removeCoachFromClient } from "@/server/repositories/clients";

export async function removeCoachFromClientService(client: SupabaseClient, client_id: string) {
	const e = await removeCoachFromClient(client, client_id);
	if (!e) {
		throw new Error("Failed to remove coach from client");
	}
	return e;
}
