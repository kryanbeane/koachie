import { fetchClientInviteService } from "@/server/services/client_invites";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
	const email = event.url.searchParams.get("email");
	const coach_id = event.url.searchParams.get("coach_id");

	if (!email || !coach_id) {
		return new Response(JSON.stringify({ error: "Missing required parameters" }), { status: 400 });
	}

	const invite = await fetchClientInviteService(event.locals.supabase, {
		email,
		coach_id,
		code: ""
	});

	return new Response(JSON.stringify(invite), {
		headers: { "Content-Type": "application/json" }
	});
};
