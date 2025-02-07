import type { PageServerLoad } from "./$types";
import { fetchClients } from "@/server/repositories/clients";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const clients = await fetchClients(supabase, "86d60b98-6321-4fe0-9180-365ccd0ec65d");

	return {
		clients: clients
	};
};
