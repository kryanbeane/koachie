// File for CRUD operations on exercises
import type { RequestHandler } from '@sveltejs/kit';

import { getExercises, addExercise, editExercise, removeExercise } from '@/services/exercises';

export const GET: RequestHandler = async (event) => {
	const exercises = await getExercises(event.locals.supabase);
	console.log('EXERCISES ', exercises);
	return new Response(JSON.stringify(exercises));
};

export const POST: RequestHandler = async (event) => {
	const exercise = await event.request.json();
	const newExercise = await addExercise(event.locals.supabase, exercise);
	return new Response(JSON.stringify(newExercise));
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
