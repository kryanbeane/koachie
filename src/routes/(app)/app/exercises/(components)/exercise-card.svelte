<script lang="ts">
	import { cn } from "$lib/utils.js";

	import { Button } from "$lib/components/ui/button/index.js";
	import { createExerciseSchema, type Exercise } from "@/schemas/exercises";
	import { updateExerciseSchema } from "@/schemas/exercises";
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { superForm, type FormResult, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { toast } from "svelte-sonner";
	import type { ActionData } from "../$types";
	import type { AllExerciseState } from "@/stores/all_exercise_state.svelte";
	import ExerciseForm from "./exercise-form.svelte";

	let {
		createMode = $bindable(true),
		editMode,
		ex,
		exercise,
		exercisesState
	}: {
		ex: SuperValidated<Exercise>;
		editMode: boolean;
		createMode: boolean;
		exercise: Exercise | null;
		exercisesState: AllExerciseState;
	} = $props();
	const createForm = superForm(ex, {
		id: "create-exercise-form",
		validators: zodClient(createExerciseSchema),
		onUpdate({ form, result }) {
			createMode = false;
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.exercise) {
				exercisesState.add(action.exercise);
				toast.success(`Exercise ${action.exercise.name} created successfully.`);
			}
		}
	});
	const { form: createFormData, enhance: createEnhance } = createForm;

	const updateForm = superForm(exercise!, {
		id: "update-exercise-form",
		validators: zodClient(updateExerciseSchema),
		onUpdate({ form, result }) {
			editMode = false;
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.exercise) {
				exercisesState.update(action.exercise);
				toast.success(`Exercise ${action.exercise.name} updated successfully.`);
			}
		}
	});

	const { form: updateFormData, enhance: updateEnhance } = updateForm;

	const deleteForm = superForm(exercise!, {
		id: "delete-exercise-form",
		validators: zodClient(updateExerciseSchema),
		onUpdate({ form, result }) {
			$deleteFormData = { ...exercise! };
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.id) {
				exercisesState.remove(action.id);
				toast.success(`Exercise deleted successfully.`);
			}
		}
	});

	const { form: deleteFormData, enhance: deleteEnhance } = deleteForm;

	// Handle edit Button click
	function handleEdit(event: Event, exercise: Exercise) {
		console.log("Edit clicked for:", exercise.id);
		$updateFormData = { ...exercise };
		editMode = true;
	}

	// Handle cancel Button click
	function handleCancel(event: Event, exercise: Exercise) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log("Cancel clicked for:", exercise.id);
		editMode = false;
	}

	function handleCancelCreate(event: Event, exercise: Exercise) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log("Cancel clicked for:", exercise.id);
		createMode = false;
	}
</script>

{#if !editMode && !createMode}
	<div
		class={cn(
			"group relative flex h-fit items-start gap-4 rounded-lg border p-3 text-left text-sm",
			" transition-all duration-300 ease-in-out",
			!editMode && "hover:border-accent hover:bg-accent hover:shadow-lg hover:shadow-accent/70",
			editMode && "border-gray-500 bg-gray-800"
		)}
	>
		<!--Main Content -->
		<div class="flex w-full items-start">
			<div class="flex w-[55%] flex-col gap-1">
				<div class="flex items-center">
					<div class="font-semibold">{exercise!.name}</div>
				</div>
				<div class="mt-1 line-clamp-2 text-xs text-muted-foreground">
					{exercise!.note.substring(0, 300)}
				</div>
				<div class="text-xs font-medium">{exercise!.movement_type}</div>

				<div
					class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
				>
					{#each exercise!.muscle_groups as group (group)}
						<span class=" whitespace-nowrap">
							<Badge>{group}</Badge>
						</span>
					{/each}
				</div>
			</div>

			<!-- Instructions Section -->
			{#if exercise!.instructions.length > 0}
				<div
					class={cn(
						"ml-10 w-[40%] transform transition-all duration-300 ease-in-out",
						"group-hover:-translate-x-10"
					)}
				>
					<div
						class={cn(
							"scrollbar-thin scrollbar-thumb-gray-200 h-full max-h-24 overflow-y-auto rounded-md border-2 border-white p-2"
						)}
					>
						<!-- <h3 class="text-md mb-1 text-center font-semibold text-white">Instructions</h3> -->

						<ul class="space-y-2">
							{#each exercise!.instructions as instruction}
								<li class="rounded-md border border-white p-1 text-left text-sm text-white">
									{instruction}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}
		</div>

		<div
			class="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
		>
			<Button
				class="mr-2 rounded-md bg-gray-200 p-3 transition-all hover:bg-gray-300"
				aria-label="Edit"
				onclick={(e) => handleEdit(e, exercise!)}
			>
				<svg
					class="h-4 w-4 text-gray-800"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
					/>
				</svg>
			</Button>
			<form method="POST" action="?/deleteExercise" use:deleteEnhance>
				<Form.Field form={deleteForm} name="deleteExercise">
					<Form.Control>
						{#snippet children({ props })}
							<Input type="hidden" name="id" bind:value={$deleteFormData.id} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button
					class="mr-2 rounded-md bg-red-200 p-3 transition-all hover:bg-red-300"
					aria-label="Delete"
				>
					<svg
						class="h-4 w-4 text-gray-800"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
						/>
					</svg>
				</Form.Button>
			</form>
		</div>
	</div>
{:else if editMode && !createMode}
	<ExerciseForm
		formAction="?/updateExercise"
		form={updateForm}
		formData={updateFormData}
		{handleCancel}
		enhance={updateEnhance}
		exercise={exercise!}
	/>
{:else if createMode && !editMode}
	<ExerciseForm
		formAction="?/createExercise"
		form={createForm}
		formData={createFormData}
		handleCancel={handleCancelCreate}
		enhance={createEnhance}
		exercise={exercise!}
	/>
{/if}
