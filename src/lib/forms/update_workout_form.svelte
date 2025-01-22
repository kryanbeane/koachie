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
</script>

<script lang="ts">
	let { updateForm }: { updateForm: SuperValidated<Workout> } = $props();

	let allWorkoutState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	const form = superForm(updateForm, {
		id: "update-workout-form",
		validators: zodClient(workoutSchema),

		onUpdate({ form, result }) {
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.workout) {
				allWorkoutState.add(action.workout[0]);
				toast.success(`Workout ${action.workout[0].name} Updated!`);
			}
		}
	});

	const { form: formData, enhance } = form;

	$effect(() => {
		let workout = getSelectedWorkoutState().workout;
		if (workout) {
			$formData = workout;
		} else {
			$formData = {
				name: "",
				description: ""
			};
		}
	});
</script>

<form method="POST" action="?/update_workout" use:enhance class="m-4 flex h-full flex-col">
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

	<Form.Button variant="secondary" size="xs" class="w-36">Update Workout</Form.Button>
</form>
