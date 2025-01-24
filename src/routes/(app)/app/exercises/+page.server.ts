import { fetchExercises } from "@/server/repositories/exercises";
import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { createExerciseSchema, exerciseSchema, updateExerciseSchema } from "@/schemas/exercises";
import { addExercise, removeExercise, editExercise } from "@/server/services/exercises";

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
			form.data.instructions = form.data.instructions[0].split(",");
		}

		if (Array.isArray(form.data.muscle_groups) && form.data.muscle_groups.length === 1) {
			form.data.muscle_groups = form.data.muscle_groups[0].split(",");
		}

		const exercise = (await addExercise(event.locals.supabase, form.data)).at(0);
		return {
			form,
			exercise
		};
	},
	updateExercise: async (event) => {
		console.log("Update action triggered!");
		const form = await superValidate(event, zod(exerciseSchema));
		if (!form.valid) {
			return fail(400, {
				error: "Invalid form data",
				form
			});
		}

		if (Array.isArray(form.data.instructions) && form.data.instructions.length === 1) {
			form.data.instructions = form.data.instructions[0].split(",");
		}

		if (Array.isArray(form.data.muscle_groups) && form.data.muscle_groups.length === 1) {
			form.data.muscle_groups = form.data.muscle_groups[0].split(",");
		}

		const exercise = (await editExercise(event.locals.supabase, form.data)).at(0);
		return {
			form,
			exercise
		};
	},
	deleteExercise: async (event) => {
		const form = await superValidate(event, zod(exerciseSchema));
		const exerciseData = form.data;
		if (!exerciseData) {
			return fail(400, { error: "Exercise data is missing" });
		}

		// Delete from the database
		const success = await removeExercise(event.locals.supabase, exerciseData);
		if (!success) {
			return fail(500, { error: "Failed to delete exercise" });
		}

		const id = exerciseData.id;

		return {
			form,
			id
		};
	}
};
