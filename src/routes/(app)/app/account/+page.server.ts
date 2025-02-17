import { profileFormSchema } from "@/schemas/profile";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { fetchNumClients } from "@/server/repositories/clients";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const schema = await superValidate(zod(profileFormSchema));
	const clientCount = await fetchNumClients(supabase);

	return { schema, clientCount };
};
