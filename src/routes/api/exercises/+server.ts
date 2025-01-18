import type { RequestHandler } from "@sveltejs/kit";

import { addExercise, editExercise, getExercises, removeExercise } from "@/services/exercises";

export const GET: RequestHandler = async (event) => {
	const exercises = await getExercises(event.locals.supabase, event.params.coachId);
	return new Response(JSON.stringify(exercises));
};

export const POST: RequestHandler = async (event) => {
	try {
		const exercise = await event.request.json();
		const newExercise = await addExercise(event.locals.supabase, exercise);
		return new Response(JSON.stringify(newExercise), { status: 201 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return new Response(JSON.stringify({ error: errorMessage }), {
			status: 500
		});
	}
};

export const PUT: RequestHandler = async (event) => {
	const exercise = await event.request.json();
	const updatedExercise = await editExercise(event.locals.supabase, exercise);
	return new Response(JSON.stringify(updatedExercise));
};

export const DELETE: RequestHandler = async (event) => {
	const exercise = await event.request.json();
	const deletedExercise = await removeExercise(event.locals.supabase, exercise);
	return new Response(JSON.stringify(deletedExercise));
};
