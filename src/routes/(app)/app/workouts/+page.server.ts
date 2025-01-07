import { createWorkoutFormSchema } from '@/schemas/workouts.js';
import type { Actions, PageServerLoad } from './$types.js';
import { fail } from 'assert';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { getWorkouts } from '@/services/workouts.js';

export const load: PageServerLoad = async ({ locals: { supabase }, cookies }) => {
	const layoutCookie = cookies.get('PaneForge:layout');
	const collapsedCookie = cookies.get('PaneForge:collapsed');

	let layout: number[] | undefined;
	let collapsed: boolean | undefined;

	if (layoutCookie) layout = JSON.parse(layoutCookie);

	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);
	const workouts = await getWorkouts(supabase);
	return { layout, collapsed, workouts, form: await superValidate(zod(createWorkoutFormSchema)) };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createWorkoutFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
