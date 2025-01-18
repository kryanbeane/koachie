import { fail } from "assert";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { workoutSchema } from "@/schemas/workouts.js";
import { addWorkout, getWorkouts } from "@/services/workouts.js";

import type { Actions, PageServerLoad } from "./$types.js";
export const load: PageServerLoad = async ({ locals: { supabase }, cookies }) => {
	const layoutCookie = cookies.get("PaneForge:layout");
	const collapsedCookie = cookies.get("PaneForge:collapsed");

	let layout: number[] | undefined;
	let collapsed: boolean | undefined;

	if (layoutCookie) layout = JSON.parse(layoutCookie);

	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);

	const form = await superValidate(zod(workoutSchema));
	const workouts = await getWorkouts(supabase);

	return {
		layout,
		collapsed,
		workouts,
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(workoutSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const workout = await addWorkout(event.locals.supabase, form.data);
		return {
			form,
			workout
		};
	}
};
