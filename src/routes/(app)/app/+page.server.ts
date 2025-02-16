import { fetchNumExercises } from "@/server/repositories/exercises";
import { fetchNumWorkouts } from "@/server/repositories/workouts";
import { fetchNumClients } from "@/server/repositories/clients";
import type { Actions, PageServerLoad } from "./$types";
import { fetchClients } from "@/server/repositories/clients";
import { clientInviteSchema } from "@/schemas/client_invites";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { PUBLIC_RESEND_TOKEN } from "$env/static/public";
import { Resend } from "resend";
import {
	isClientInviteCreatedService,
	createClientInviteService
} from "@/server/services/client_invites";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesCount = await fetchNumExercises(supabase);
	const workoutCount = await fetchNumWorkouts(supabase);
	const clientCount = await fetchNumClients(supabase);
	const clients = await fetchClients(supabase, "86d60b98-6321-4fe0-9180-365ccd0ec65d");
	const createForm = await superValidate(zod(clientInviteSchema));

	return {
		numExercises: exercisesCount,
		numWorkouts: workoutCount,
		numClients: clientCount,
		clients: clients,
		createForm: createForm
	};
};

export const actions: Actions = {
	create_invite: async (event) => {
		const form = await superValidate(event, zod(clientInviteSchema));
		const formData = form.data;
		console.log("FORM DATA", formData);

		if (
			await isClientInviteCreatedService(event.locals.supabase, {
				email: formData.email,
				code: formData.code,
				coach_id: formData.coach_id
			})
		) {
			console.log("CLIENT INVITE ALREADY CREATED");
		} else {
			await createClientInviteService(event.locals.supabase, {
				email: formData.email,
				code: formData.code,
				coach_id: formData.coach_id
			});
		}

		const resend = new Resend(PUBLIC_RESEND_TOKEN);
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: "todo@gmail.com", //TODO
			subject: "Hello World",
			html: "<p>Congrats on sending your <strong>first email</strong>!</p>"
		});

		if (error) {
			return console.error({ error });
		}

		console.log({ data });

		return {
			form
		};
	}
};
