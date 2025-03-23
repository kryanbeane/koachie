import type { RequestHandler } from "@sveltejs/kit";
import ExerciseInstanceService from "@/server/services/exercise_instances";

let svc: ExerciseInstanceService;

export const GET: RequestHandler = async (event) => {
	svc = new ExerciseInstanceService(event.locals.supabase);
	const instances = await svc.getExerciseInstances(event.params.coachId);
	return new Response(JSON.stringify(instances));
};

export const POST: RequestHandler = async (event) => {
	svc = new ExerciseInstanceService(event.locals.supabase);
	const instance = await event.request.json();
	const newInstance = await svc.addExerciseInstance(instance.instance);
	return new Response(JSON.stringify(newInstance));
};

export const PUT: RequestHandler = async (event) => {
	svc = new ExerciseInstanceService(event.locals.supabase);
	const instance = await event.request.json();
	const updatedInstance = await svc.editExerciseInstance(instance);
	return new Response(JSON.stringify(updatedInstance));
};

export const DELETE: RequestHandler = async (event) => {
	svc = new ExerciseInstanceService(event.locals.supabase);
	const instances = await event.request.json();
	console.log("DELETE INSTANCES", instances);
	const deletedInstance = await svc.deleteExerciseInstances(instances.instances);
	return new Response(JSON.stringify(deletedInstance));
};
