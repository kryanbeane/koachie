<script lang="ts" module>
	import { workoutSchema } from "@/schemas/workouts";
	import * as Form from "$lib/components/ui/form/index.js";
	import SuperDebug, { superForm, type FormResult } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import NameInput from "@/components/ui/input/name-input.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { toast } from "svelte-sonner";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import type { ActionData } from "../../routes/(app)/app/workouts/$types";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import { getDebugState } from "@/stores/debug_state.svelte";
</script>

<script lang="ts">
	let { data, create_mode = $bindable() } = $props();

	const form = superForm(data.createForm, {
		id: "create-workout-form",
		validators: zodClient(workoutSchema),
		resetForm: true,

		onUpdate({ form, result }) {
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.workout) {
				allWorkoutState.add(action.workout[0]);
				selectedWorkoutState.set(action.workout[0]);
				create_mode = false;
				toast.success(`Workout ${action.workout[0].name} Created!`);
			}
		}
	});

	const { form: formData, enhance: createEnhance } = form;

	let allWorkoutState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	$effect(() => {
		let workout = selectedWorkoutState.workout;
		if (workout) {
			$formData = workout;
		} else {
			$formData = {
				name: "",
				description: ""
			};
		}
	});
	let debugState = getDebugState();
</script>

<form method="POST" action="?/create_workout" use:createEnhance class="m-4 flex h-full flex-col">
	<input type="hidden" name="id" bind:value={$formData.id} />
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<NameInput placeholder="New workout name..." {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Textarea
					placeholder="The workout that will win you the Mr. Olympia..."
					{...props}
					bind:value={$formData.description}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button variant="secondary" size="xs" class="w-36">Create Workout</Form.Button>
	{#if debugState.debug}
		<div class="m-4">
			<SuperDebug data={formData} stringTruncate={1000} />
		</div>
	{/if}
</form>
