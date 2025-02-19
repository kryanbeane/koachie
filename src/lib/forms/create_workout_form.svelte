<script lang="ts">
	import {
		createWorkoutSchema,
		type CreateWorkoutSchema,
		type ExerciseInstance
	} from "@/schemas/workouts";
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
	import ComboBox from "@/components/ui/combo-box/combo-box.svelte";
	import { ExperienceLevelValues, ModalityValues } from "@/data/enums";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import NoOutlineInput from "../../routes/(app)/app/workouts/(components)/(other)/no_outline_input.svelte";
	import { Button } from "@/components/ui/button";
	import SelectExercise from "../../routes/(app)/app/workouts/(components)/(exercise_instances)/select_exercise.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import TimeWidget from "../../routes/(app)/app/workouts/(components)/(exercise_instances)/time_widget.svelte";
	import { InputWithVariant } from "@/components/ui/input";
	let { data, exercises } = $props();
	let { createForm }: { createForm: CreateWorkoutSchema } = data;

	const form = superForm(createForm, {
		id: "create-workout-form",
		validators: zodClient(createWorkoutSchema),
		resetForm: true,
		dataType: "json",

		onUpdate({ form, result }) {
			if (!form.valid) {
				toast.error("Form is invalid");
				console.log("Create Workout Errors", result.data.form.errors);
			}
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.workout) {
				if (action.created_instances) {
					console.log("action.exercise_instances", action.created_instances);
				}
				allWorkoutState.add(action.workout[0]);
				selectedWorkoutState.set(action.workout[0]);
				goto(`${page.url.pathname}?mode=none`);

				toast.success(`Workout ${action.workout[0].name} Created!`);
			}
		}
	});

	const { form: formData, enhance: createEnhance } = form;

	onMount(() => {
		$formData.exercise_instances = [
			{
				exercise_id: "",
				sets: [
					{
						order: 0,
						weight: 0,
						reps: 0,
						restTime: "03:00"
					}
				]
			}
		] as ExerciseInstance[];
	});

	$inspect($formData);

	let allWorkoutState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	let debugState = getDebugState();
</script>

<form method="POST" action="?/create_workout" use:createEnhance class="m-4 flex h-full flex-col">
	<Input type="hidden" name="id" bind:value={$formData.id} />
	<Form.Field {form} name="name" class="w-full">
		<Form.Control>
			{#snippet children({ props })}
				<NameInput placeholder="New workout name..." {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="flex gap-2">
		<Form.Field {form} name="description" class="w-full">
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

		<div class="flex-col">
			<input type="hidden" name="modality" bind:value={$formData.modality} />
			<Form.Field {form} name="modality">
				<Form.Control>
					{#snippet children({ props })}
						<ComboBox
							{...props}
							bind:value={$formData.modality}
							options={ModalityValues}
							field={"Modality"}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<input type="hidden" name="experience_level" bind:value={$formData.experience_level} />
			<Form.Field {form} name="experience_level" class="w-full">
				<Form.Control>
					{#snippet children({ props })}
						<ComboBox
							{...props}
							bind:value={$formData.experience_level}
							options={ExperienceLevelValues}
							field={"Experience Level"}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
	</div>
	{#each $formData.exercise_instances as instance, i}
		<Card.Root class="mb-4 mt-2 bg-muted/50 ">
			<Card.Content class="!p-4">
				<Form.ElementField {form} name="exercise_instances[{i}].exercise_id">
					<Form.Control>
						{#snippet children({ props })}
							<SelectExercise
								bind:exercise_id={$formData.exercise_instances[i].exercise_id}
								{exercises}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>

				<Table.Root class="my-2">
					<Table.Header>
						<Table.Row>
							<Table.Head class="!h-8 text-center">Set</Table.Head>
							<Table.Head class="!h-8 text-center">Weight</Table.Head>
							<Table.Head class="!h-8 text-center">Reps</Table.Head>
							<Table.Head class="!h-8 text-center">Rest</Table.Head>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{#each instance.sets as set, j}
							<Table.Row>
								<Table.Cell class="text-center">{set.order + 1}</Table.Cell>
								<Table.Cell class="text-center">
									<Form.ElementField {form} name="exercise_instances[{i}].sets[{j}].weight">
										<Form.Control>
											{#snippet children({ props })}
												<InputWithVariant
													variant="set"
													type="number"
													placeholder="50 kg"
													bind:value={$formData.exercise_instances[i].sets[j].weight}
													{...props}
												/>
											{/snippet}
										</Form.Control>
										<Form.FieldErrors />
									</Form.ElementField>
								</Table.Cell>
								<Table.Cell class="text-center">
									<InputWithVariant
										variant="set"
										type="number"
										placeholder="6-10"
										bind:value={$formData.exercise_instances[i].sets[j].reps}
									/>
								</Table.Cell>

								<Table.Cell class="text-center">
									<TimeWidget time={$formData.exercise_instances[i].sets[j].restTime} />
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
				<div class="flex items-center gap-2">
					<Button
						class="mt-2"
						size="sm"
						variant="secondary"
						onclick={() => {
							const perf = [
								...$formData.exercise_instances[i].sets,
								{
									order: $formData.exercise_instances[i].sets.length,
									weight: null,
									reps: null,
									restTime: ""
								}
							];

							$formData.exercise_instances[i].sets = perf;
						}}
					>
						Add Set
					</Button>

					<NoOutlineInput
						type="text"
						placeholder={$formData.exercise_instances[i].note || "Enter notes here..."}
						bind:value={$formData.exercise_instances[i].note}
						class="mt-2 flex-grow"
					/>
				</div>
			</Card.Content>
		</Card.Root>
	{/each}

	<div class="flex justify-between">
		<Button
			variant="secondary"
			size="xs"
			class="w-36"
			onclick={() => {
				$formData.exercise_instances = [
					...$formData.exercise_instances,
					{
						exercise_id: "",
						sets: [
							{
								order: $formData.exercise_instances.length,
								weight: null,
								reps: null,
								restTime: "03:00"
							}
						]
					}
				];
			}}
		>
			Add Exercise
		</Button>

		<Form.Button variant="default" size="xs" class="ml-auto w-36">Create Workout</Form.Button>
	</div>

	{#if debugState.debug}
		<div class="m-4">
			<SuperDebug data={formData} stringTruncate={1000} />
		</div>
	{/if}
</form>
