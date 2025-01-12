import { fetchExercises } from '@/repositories/exercises';
import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createExerciseSchema, exerciseSchema, updateExerciseSchema } from '@/schemas/exercises';
import { addExercise, removeExercise, editExercise } from '@/services/exercises';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const exercisesData = await fetchExercises(supabase);

	const ex = await superValidate(zod(exerciseSchema));
	return {
		ex,
		exercises: exercisesData,
		createForm: await superValidate(zod(createExerciseSchema)),
		updateForm: await superValidate(zod(updateExerciseSchema))
	};
};

export const actions: Actions = {
	createExercise: async (event) => {
		const form = await superValidate(event, zod(createExerciseSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (Array.isArray(form.data.instructions) && form.data.instructions.length === 1) {
			form.data.instructions = form.data.instructions[0].split(',');
		}

		if (Array.isArray(form.data.muscle_groups) && form.data.muscle_groups.length === 1) {
			form.data.muscle_groups = form.data.muscle_groups[0].split(',');
		}

		console.log('FORM DATA', form.data);

		await addExercise(event.locals.supabase, form.data);
		return {
			form
		};
	},
	updateExercise: async (event) => {
		console.log('Update action triggered!');
		const form = await superValidate(event, zod(updateExerciseSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (Array.isArray(form.data.instructions) && form.data.instructions.length === 1) {
			form.data.instructions = form.data.instructions[0].split(',');
		}

		if (Array.isArray(form.data.muscle_groups) && form.data.muscle_groups.length === 1) {
			form.data.muscle_groups = form.data.muscle_groups[0].split(',');
		}

		console.log('FORM DATA', form.data);

		await editExercise(event.locals.supabase, form.data);
		return {
			form
		};
	},
	deleteExercise: async (event) => {
		const form = await superValidate(event, zod(createExerciseSchema));
		const exerciseData = form.data;
		if (!exerciseData) {
			return fail(400, { error: 'Exercise data is missing' });
		}

		console.log('FORM DATA', exerciseData);

		// Delete from the database
		const success = await removeExercise(event.locals.supabase, exerciseData);
		if (!success) {
			return fail(500, { error: 'Failed to delete exercise' });
		}

		return {
			success: true
		};
	}
};
