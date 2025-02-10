import type { RequestHandler } from "@sveltejs/kit";

import { removeCoachFromClientService } from "$lib/server/services/clients";

export const DELETE: RequestHandler = async (event) => {
	const client_id = await event.request.json();
	if (!client_id) {
		return new Response(JSON.stringify({ error: "Client ID is required" }), { status: 400 });
	}
	const removedCoach = await removeCoachFromClientService(event.locals.supabase, client_id.id);
	return new Response(JSON.stringify(removedCoach));
};
