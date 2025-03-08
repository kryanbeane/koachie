<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { CreateWorkoutSchema, ExerciseInstance, Workout } from "@/schemas/workouts.js";
	import { onMount } from "svelte";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import { Separator } from "@/components/ui/separator";
	import * as DropdownMenu from "@/components/ui/dropdown-menu";
	import { Ban, Copy, Ellipsis, Trash2 } from "lucide-svelte";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import { toast } from "svelte-sonner";
	import { Button } from "@/components/ui/button";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import type { Exercise } from "@/schemas/exercises";

	let selectedWorkoutState = getSelectedWorkoutState();
	let allWorkoutState = getAllWorkoutState();
	let { workouts }: { workouts: CreateWorkoutSchema[] } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			selectedWorkoutState.clear();
			goto(`${page.url.pathname}?mode=none`);
		}
	}

	onMount(() => {
		window.addEventListener("keydown", handleKeydown);
		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	});

	async function handleDeleteWorkout(workout: CreateWorkoutSchema) {
		const workout_id = workout.id;

		const response = await fetch(`/api/exercise_instances`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ instances: workout.exercise_instances })
		});

		if (response.ok) {
			toast.success(`Workout Exercise Instances Deleted!`);

			// Delete workout if exercise instances are deleted

			const response2 = await fetch(`/api/workouts`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: workout_id })
			});

			if (response2.ok) {
				allWorkoutState.remove(workout);
				selectedWorkoutState.clear();

				toast.success(`Workout Deleted!`);
			}
		}
	}

	async function handleDuplicateWorkout(workout: CreateWorkoutSchema) {
		let newWorkout: Workout = {
			name: `${workout.name.trimEnd()} Copy`,
			id: undefined,
			description: workout.description,
			modality: workout.modality,
			experience_level: workout.experience_level
		};

		let newExerciseInstances: ExerciseInstance[] = [...(workout.exercise_instances || [])];

		const response = await fetch(`/api/workouts`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newWorkout)
		});

		if (response.ok) {
			const responseData = JSON.parse(await response.text());

			let new_exercise_instances: ExerciseInstance[] = [];

			for (let i = 0; i < newExerciseInstances.length; i++) {
				let instance = newExerciseInstances[i];
				if (!instance) {
					console.warn(`Skipping undefined exercise instance at index ${i}`);
					continue;
				}

				let exerciseInstance: ExerciseInstance = {
					exercise_id: instance.exercise_id,
					workout_id: responseData[0].id,
					sets: instance.sets,
					note: instance.note
				};

				console.log("Creating exercise instance:", exerciseInstance);

				const response2 = await fetch(`/api/exercise_instances`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ instance: exerciseInstance })
				});

				if (response2.ok) {
					console.log("Exercise Instance Created");
					const response2Data = JSON.parse(await response2.text());
					console.log("response2Data", response2Data);
					new_exercise_instances = [...new_exercise_instances, response2Data];
				}
			}

			console.log("new_exercise_instances", new_exercise_instances);

			let createdWorkout: CreateWorkoutSchema = {
				...responseData[0],
				exercise_instances: new_exercise_instances
			};
			allWorkoutState.add(createdWorkout);

			let selected = allWorkoutState.findById(responseData[0].id!);
			if (selected) {
				selectedWorkoutState.set(selected);
			}

			toast.success(`Workout ${workout.name} Duplicated!`);
		}
	}
</script>

<div class="flex w-full flex-col gap-2 p-4">
	{#if selectedWorkoutState.workout}
		<div class="text-xs font-semibold lowercase text-muted-foreground">selected workouts</div>

		<button
			class="relative flex flex-col items-start rounded-lg border bg-muted p-3 text-left text-sm transition-all hover:bg-accent"
			onclick={() => selectedWorkoutState.clear()}
		>
			<div class="flex w-full flex-col gap-1">
				<div class="flex items-center">
					<div class="flex items-center gap-2">
						<span class="font-semibold">
							{selectedWorkoutState.workout.name}
						</span>
					</div>
				</div>
			</div>
			<div class="max-w-full truncate text-ring">{selectedWorkoutState.workout.description}</div>
		</button>
		<Separator class="my-2" />
	{/if}

	{#each workouts as workout (workout.id)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#if selectedWorkoutState.workout?.id !== workout.id}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class={cn(
					"relative flex flex-col items-start gap-2 rounded-lg border bg-muted/25 p-3 text-left text-sm transition-all hover:scale-105 hover:bg-accent",
					selectedWorkoutState.workout?.id === workout.id && "bg-muted"
				)}
				onclick={() => {
					selectedWorkoutState.set(workout);
					goto(`${page.url.pathname}?mode=update`);
				}}
			>
				<div class="flex w-full flex-col gap-1">
					<div class="flex items-center">
						<div class="flex items-center gap-2">
							<div class="truncate text-xs font-semibold">
								{workout.name}
							</div>
						</div>
						<div
							class={cn(
								"ml-auto text-xs",
								selectedWorkoutState.workout?.id === workout.id
									? "text-foreground"
									: "text-muted-foreground"
							)}
						></div>
					</div>
				</div>
				<div class="max-w-full truncate text-xs text-ring">{workout.description}</div>
				<div class="absolute right-2 top-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger id={workout.id}>
							<!-- No propagation -->
							<Button class="!bg-transparent hover:scale-105" size="xs">
								<Ellipsis size="20" class="text-muted-foreground" />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item
								onclick={() => {
									handleDeleteWorkout(workout);
								}}
							>
								<Trash2 />
								Delete</DropdownMenu.Item
							>
							<DropdownMenu.Item
								onclick={() => {
									handleDuplicateWorkout(workout);
								}}
							>
								<Copy />
								Duplicate</DropdownMenu.Item
							>
							<DropdownMenu.Item
								onclick={() => {
									console.log("Cancel");
								}}
							>
								<Ban />
								Cancel</DropdownMenu.Item
							>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		{/if}
	{/each}
</div>
