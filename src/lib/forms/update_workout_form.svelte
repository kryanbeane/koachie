<script lang="ts" module>
	import {
		createWorkoutSchema,
		workoutSchema,
		type CreateWorkoutSchema,
		type ExerciseInstance
	} from "@/schemas/workouts";
	import * as Form from "$lib/components/ui/form/index.js";
	import { superForm, type FormResult } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import NameInput from "@/components/ui/input/name-input.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { toast } from "svelte-sonner";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import type { ActionData } from "../../routes/(app)/app/workouts/$types";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import SuperDebug from "sveltekit-superforms";
	import { getDebugState } from "@/stores/debug_state.svelte";
	import ComboBox from "@/components/ui/combo-box/combo-box.svelte";
	import { ModalityValues, ExperienceLevelValues } from "@/data/enums";
	import * as Card from "@/components/ui/card";
	import * as Table from "@/components/ui/table";
	import NoOutlineInput from "../../routes/(app)/app/workouts/(components)/(other)/no_outline_input.svelte";
	import { Button } from "@/components/ui/button";
	import SelectExercise from "../../routes/(app)/app/workouts/(components)/(exercise_instances)/select_exercise.svelte";
	import { Input, InputWithVariant } from "@/components/ui/input";
	import TimeWidget from "../../routes/(app)/app/workouts/(components)/(exercise_instances)/time_widget.svelte";
</script>

<script lang="ts">
	const { data, exercises } = $props();

	let { updateForm }: { updateForm: CreateWorkoutSchema } = data;

	let allWorkoutState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	const form = superForm(updateForm, {
		id: selectedWorkoutState.workout?.id,
		validators: zodClient(createWorkoutSchema),
		resetForm: false,
		dataType: "json",

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
		if (selectedWorkoutState.workout) {
			console.log("selectedWorkoutState.workout", selectedWorkoutState.workout);
			updateFormData.set({
				...selectedWorkoutState.workout
			});
		}
	});

	function handleRemoveExerciseInstance(instance: ExerciseInstance) {
		$updateFormData.exercise_instances = $updateFormData.exercise_instances.filter(
			(i) => i !== instance
		);
	}

	let debugState = getDebugState();
</script>

<form method="POST" action="?/update_workout" use:updateEnhance class="m-4 flex h-full flex-col">
	<Input type="hidden" name="id" bind:value={$updateFormData.id} />
	<div class="flex gap-2">
		<Form.Field {form} name="name" class="w-full">
			<Form.Control>
				{#snippet children({ props })}
					<NameInput
						placeholder="New workout name..."
						{...props}
						bind:value={$updateFormData.name}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<input type="hidden" name="modality" bind:value={$updateFormData.modality} />
		<Form.Field {form} name="modality">
			<Form.Control>
				{#snippet children({ props })}
					<ComboBox
						{...props}
						bind:value={$updateFormData.modality}
						options={ModalityValues}
						field={"Modality"}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<input type="hidden" name="experience_level" bind:value={$updateFormData.experience_level} />
		<Form.Field {form} name="experience_level">
			<Form.Control>
				{#snippet children({ props })}
					<ComboBox
						{...props}
						bind:value={$updateFormData.experience_level}
						options={ExperienceLevelValues}
						field={"Experience Level"}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

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

	{#each $updateFormData.exercise_instances as instance, i}
		<Card.Root class="group relative mb-4 mt-2 bg-muted/50 ">
			<Card.Content class="!p-4">
				<Form.ElementField {form} name="exercise_instances[{i}].exercise_id">
					<Form.Control>
						{#snippet children({ props })}
							<SelectExercise
								bind:exercise_id={$updateFormData.exercise_instances[i].exercise_id}
								{exercises}
								{...props}
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
													bind:value={$updateFormData.exercise_instances[i].sets[j].weight}
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
										bind:value={$updateFormData.exercise_instances[i].sets[j].reps}
									/>
								</Table.Cell>

								<Table.Cell class="text-center">
									<TimeWidget time={$updateFormData.exercise_instances[i].sets[j].restTime} />
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
								...instance.sets,
								{
									order: instance.sets.length,
									weight: null,
									reps: null,
									restTime: ""
								}
							];

							instance.sets = perf;
						}}
					>
						Add Set
					</Button>

					<div class="group relative mt-2 flex w-full items-center">
						<!-- Input Container -->
						<NoOutlineInput
							type="text"
							placeholder={$updateFormData.exercise_instances[i].note || "Enter notes here..."}
							bind:value={$updateFormData.exercise_instances[i].note}
							class="flex-1 transition-all duration-300 ease-in-out group-hover:w-[70%]"
						/>

						<!-- Remove Exercise Button -->
						<div
							class="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-4 flex-row items-center gap-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
						>
							<Button
								size="sm"
								variant="destructive"
								onclick={() => {
									handleRemoveExerciseInstance(instance);
								}}
							>
								Remove Exercise
							</Button>
						</div>
					</div>
				</div></Card.Content
			>
		</Card.Root>
	{/each}
	<div class="flex justify-between">
		<Button
			variant="secondary"
			size="xs"
			class="w-36"
			onclick={() => {
				$updateFormData.exercise_instances = [
					...$updateFormData.exercise_instances,
					{
						exercise_id: "",
						sets: [
							{
								order: $updateFormData.exercise_instances.length,
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

		<Form.Button variant="secondary" size="xs" class="w-36">Update Workout</Form.Button>

		{#if debugState.debug}
			<div class="m-4">
				<SuperDebug data={updateFormData} stringTruncate={1000} />
			</div>
		{/if}
	</div>
</form>
