<script lang="ts" module>
	import * as DropdownMenu from "@/components/ui/dropdown-menu";
	import { Separator } from "@/components/ui/separator";
	import * as Tooltip from "@/components/ui/tooltip/index";
	import { workoutSchema, type Workout } from "@/schemas/workouts";
	import { EllipsisVertical, Trash2 } from "lucide-svelte";
	import * as Form from "$lib/components/ui/form/index.js";
	import SuperDebug, {
		type SuperValidated,
		superForm,
		type FormResult
	} from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import NameInput from "@/components/ui/input/name-input.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { toast } from "svelte-sonner";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import { Button } from "@/components/ui/button";
	import type { ActionData } from "../../$types";
	import type { CreateExerciseInstance, Exercise } from "@/schemas/exercises";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
</script>

<script lang="ts">
	let {
		data,
		create_mode = $bindable()
	}: {
		data: SuperValidated<Workout>;
		create_mode: boolean;
	} = $props();

	let allWorkoutState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	let exercises: Exercise[] = $state([]);

	onMount(async () => {
		let resp = await fetch("/api/exercises", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		exercises = JSON.parse(await resp.text());
	});

	const form = superForm(data, {
		validators: zodClient(workoutSchema),

		onUpdate({ form, result }) {
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.workout) {
				allWorkoutState.add(action.workout[0]);
				toast.success(`Workout ${action.workout[0].name} Updated!`);
			}
		}
	});

	async function handleDeleteWorkout() {
		if (selectedWorkoutState.workout) {
			const response = await fetch(`/api/workouts`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: selectedWorkoutState.workout.id })
			});

			if (response.ok) {
				allWorkoutState.remove(selectedWorkoutState.workout);
				selectedWorkoutState.clear();
				create_mode = false;

				toast.success(`Workout ${selectedWorkoutState.workout.name} Deleted!`);
			}
		}
	}

	let exercise_instances: CreateExerciseInstance[] = $state([
		{
			performance: [
				{
					order: 0,
					reps: null,
					weight: null,
					restTime: "02:30"
				}
			]
		}
	]);

	const { form: formData, delayed, enhance } = form;

	function newExerciseInstance() {
		exercise_instances.push({
			performance: [
				{
					order: 0,
					reps: null,
					weight: null,
					restTime: "00:00"
				}
			]
		});
		console.log(exercise_instances);
	}

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

<div class="mt-6 flex h-full flex-grow flex-col">
	<div class="mb-1 flex items-center p-2">
		{#if create_mode}
			<span class="text-lg font-semibold">Create Workout</span>
		{/if}
		{#if selectedWorkoutState.workout}
			<div class="ml-auto flex items-center gap-2">
				<Tooltip.Root>
					<Tooltip.Trigger id="move_to_trash_tooltip" disabled={!selectedWorkoutState.workout}>
						<Button size="sm" variant="ghost" onclick={handleDeleteWorkout}>
							<Trash2 class="size-4" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Delete Workout</Tooltip.Content>
				</Tooltip.Root>
			</div>
			<Separator orientation="vertical" class="mx-2 h-6" />
			<DropdownMenu.Root>
				<DropdownMenu.Trigger id="more_options_dropdown" disabled={!selectedWorkoutState.workout}>
					<Button size="sm" variant="ghost">
						<EllipsisVertical class="size-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Mark as unread</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</div>
	<Separator />

	{#if selectedWorkoutState.workout}
		<div class="m-4">
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

			<div class="mb-4">
				<Form.Button>Submit</Form.Button>
				{#if $delayed}Creating ...{/if}
			</div>
			<!-- {#if browser}
				<SuperDebug data={$formData} />
			{/if} -->
		</div>
	{:else if create_mode}
		<form method="POST" action="?/create_workout" use:enhance class="m-4 flex h-full flex-col">
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

			<!-- <ScrollArea orientation="vertical">
				{#each exercise_instances as instance}
					<ExerciseInstanceCard {instance} {exercises} />
				{/each}
			</ScrollArea>

			<button
				class={cn(buttonVariants({ variant: "outline", size: "sm" }), "mx-4")}
				type="button"
				onclick={newExerciseInstance}
			>
				<GitBranchPlus />
				Add Exercise
			</button> -->

			<div class="mb-4">
				<Form.Button>Submit</Form.Button>
				{#if $delayed}Creating ...{/if}
			</div>
			<!-- {#if browser}
				<SuperDebug data={$formData} />
			{/if} -->
		</form>
	{:else}
		<div class="flex h-full items-center justify-center p-6">
			<span class="font-semibold">No Workouts Selected</span>
		</div>
	{/if}
</div>
