import { fail } from "assert";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { createWorkoutSchema, workoutSchema } from "@/schemas/workouts.js";
import { addWorkout, editWorkout, getWorkouts } from "@/server/services/workouts.js";

import type { Actions, PageServerLoad } from "./$types.js";
import ExerciseInstanceService from "@/server/services/exercise_instances.js";
export const load: PageServerLoad = async ({ locals: { supabase }, cookies }) => {
	const layoutCookie = cookies.get("PaneForge:layout");
	const collapsedCookie = cookies.get("PaneForge:collapsed");

	let layout: number[] | undefined;
	let collapsed: boolean | undefined;

	if (layoutCookie) layout = JSON.parse(layoutCookie);

	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);

	const createForm = await superValidate(zod(createWorkoutSchema));
	const updateForm = await superValidate(zod(workoutSchema));
	const workouts = await getWorkouts(supabase);

	return {
		layout,
		collapsed,
		workouts,
		createForm,
		updateForm
	};
};

export const actions: Actions = {
	create_workout: async (event) => {
		const exerciseInstanceService = new ExerciseInstanceService(event.locals.supabase);
		const form = await superValidate(event, zod(createWorkoutSchema));
		if (!form.valid) return fail(400, { form });

		console.log("ACTIONS CREATE WORKOUT", form.data);

		const workout = await addWorkout(event.locals.supabase, {
			name: form.data.name,
			description: form.data.description,
			modality: form.data.modality,
			experience_level: form.data.experience_level
		});

		const exercise_instances = await exerciseInstanceService.addExerciseInstances(
			form.data.exercise_instances
		);

		return {
			form,
			workout,
			exercise_instances
		};
	},
	update_workout: async (event) => {
		const form = await superValidate(event, zod(workoutSchema));
		if (!form.valid) return fail(400, { form });

		console.log("ACTIONS UPDATE WORKOUT", form.data);

		const workout = await editWorkout(event.locals.supabase, {
			id: form.data.id,
			name: form.data.name,
			description: form.data.description,
			modality: form.data.modality,
			experience_level: form.data.experience_level
		});

		return {
			form,
			workout
		};
	}
};
