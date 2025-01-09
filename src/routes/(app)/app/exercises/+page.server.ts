import { fetchExercises } from '@/repositories/exercises';
import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createExerciseSchema, updateExerciseSchema } from '@/schemas/exercises';
import { addExercise } from '@/services/exercises';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesData = await fetchExercises(supabase);

	const ex = await superValidate(zod(createExerciseSchema));
	return {
		ex,
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
		console.log('ACTION DATA', form.data);

		await addExercise(event.locals.supabase, form.data);
		return {
			form
		};
	}
};
