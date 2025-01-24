<script lang="ts" module>
	import { workoutSchema, type Workout } from "@/schemas/workouts";
	import * as Form from "$lib/components/ui/form/index.js";
	import { type SuperValidated, superForm, type FormResult } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import NameInput from "@/components/ui/input/name-input.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { toast } from "svelte-sonner";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import type { ActionData } from "../../routes/(app)/app/workouts/$types";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import SuperDebug from "sveltekit-superforms";
	import { getDebugState } from "@/stores/debug_state.svelte";
</script>

<script lang="ts">
	let { data } = $props();

	let allWorkoutState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	const form = superForm(data.updateForm, {
		id: selectedWorkoutState.workout?.id,
		validators: zodClient(workoutSchema),
		resetForm: false,

		onUpdate({ form, result }) {
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.workout) {
				// update workout in the left hand list
				allWorkoutState.update(action.workout[0]);
				// update so selected workout updates too
				selectedWorkoutState.set(action.workout[0]);

				toast.success(`Workout ${action.workout[0].name} Updated!`);
			}
			if (result.type === "failure") {
				console.error("onUpdate", result.data.form.errors);
				toast.error("Error updating workout :(");
			}
		}
	});

	const { form: updateFormData, enhance: updateEnhance } = form;

	$effect(() => {
		const workout = selectedWorkoutState.workout;
		if (workout) {
			$updateFormData = workout;
		}
	});
	let debugState = getDebugState();
</script>

<form method="POST" action="?/update_workout" use:updateEnhance class="m-4 flex h-full flex-col">
	<input type="hidden" name="id" bind:value={$updateFormData.id} />
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<NameInput placeholder="New workout name..." {...props} bind:value={$updateFormData.name} />
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
					bind:value={$updateFormData.description}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button variant="secondary" size="xs" class="w-36">Update Workout</Form.Button>

	{#if debugState.debug}
		<div class="m-4">
			<SuperDebug data={updateFormData} stringTruncate={1000} />
		</div>
	{/if}
</form>
