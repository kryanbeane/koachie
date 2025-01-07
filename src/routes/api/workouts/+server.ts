import type { RequestHandler } from '@sveltejs/kit';

import { addWorkout, editWorkout, getWorkouts, removeWorkout } from '@/services/workouts';

export const GET: RequestHandler = async (event) => {
	const workouts = await getWorkouts(event.locals.supabase);
	return new Response(JSON.stringify(workouts));
};

export const POST: RequestHandler = async (event) => {
	const workout = await event.request.json();
	const newWorkout = await addWorkout(event.locals.supabase, workout);
	return new Response(JSON.stringify(newWorkout));
};

export const PUT: RequestHandler = async (event) => {
	const workout = await event.request.json();
	const updatedWorkout = await editWorkout(event.locals.supabase, workout);
	return new Response(JSON.stringify(updatedWorkout));
};

export const DELETE: RequestHandler = async (event) => {
	const workout = await event.request.json();
	const deletedWorkout = await removeWorkout(event.locals.supabase, workout);
	return new Response(JSON.stringify(deletedWorkout));
};
