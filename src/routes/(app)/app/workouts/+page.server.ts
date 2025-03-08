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
	const svc = new ExerciseInstanceService(supabase);
	const workoutsWithInstances = await Promise.all(
		workouts.map(async (workout) => {
			if (workout.id) {
				const instance = await svc.getExerciseInstancesByWorkoutId(workout.id);
				return { ...workout, exercise_instances: instance };
			}
			return workout;
		})
	);
	console.log("This here", workoutsWithInstances);

	return {
		layout,
		collapsed,
		workoutsWithInstances,
		createForm,
		updateForm
	};
};

export const actions: Actions = {
	create_workout: async (event) => {
		const exerciseInstanceService = new ExerciseInstanceService(event.locals.supabase);
		const form = await superValidate(event, zod(createWorkoutSchema));
		if (!form.valid) return fail(400, { form });

		const workout = await addWorkout(event.locals.supabase, {
			name: form.data.name,
			description: form.data.description,
			modality: form.data.modality,
			experience_level: form.data.experience_level
		});

		const instances_with_workout_id = form.data.exercise_instances.map((inst) => ({
			...inst,
			workout_id: workout[0].id
		}));

		const created_instances =
			await exerciseInstanceService.addExerciseInstances(instances_with_workout_id);

		return {
			form,
			workout,
			created_instances
		};
	},
	update_workout: async (event) => {
		const form = await superValidate(event, zod(createWorkoutSchema));
		if (!form.valid) return fail(400, { form });

		const workout = await editWorkout(event.locals.supabase, {
			id: form.data.id,
			name: form.data.name,
			description: form.data.description,
			modality: form.data.modality,
			experience_level: form.data.experience_level
		});

		const exerciseInstanceService = new ExerciseInstanceService(event.locals.supabase);
		if (!form.data.id) {
			return fail(400, { form, error: "Workout ID is required" });
		}
		const all_instances_with_workout_id =
			await exerciseInstanceService.getExerciseInstancesByWorkoutId(form.data.id as string);
		const instances_with_workout_id = form.data.exercise_instances.map((inst) => ({
			...inst,
			workout_id: workout[0].id
		}));

		const removed_instances = all_instances_with_workout_id.filter(
			(inst) => !instances_with_workout_id.find((i) => i.id === inst.id)
		);

		if (removed_instances.length > 0) {
			await exerciseInstanceService.deleteExerciseInstances(removed_instances);
		}

		const updated_instances =
			await exerciseInstanceService.editExerciseInstances(instances_with_workout_id);

		return {
			form,
			workout,
			updated_instances
		};
	}
};
