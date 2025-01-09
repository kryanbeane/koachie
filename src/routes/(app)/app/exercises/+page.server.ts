import { fetchExercises } from '@/repositories/exercises';
import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createExerciseSchema, updateExerciseSchema } from '@/schemas/exercises';
import { addExercise } from '@/services/exercises';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesData = await fetchExercises(supabase);
	console.log('EXECISES DATA PAGE LOAD', exercisesData);
	return {
		exercises: exercisesData,
		createForm: await superValidate(zod(createExerciseSchema)),
		updateForm: await superValidate(zod(updateExerciseSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createExerciseSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		console.log('FORM DATA', form.data);

		await addExercise(event.locals.supabase, form.data);
		return {
			form
		};
	}
};
