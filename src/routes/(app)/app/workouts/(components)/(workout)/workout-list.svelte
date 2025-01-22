<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Workout } from "@/schemas/workouts.js";
	import { onMount } from "svelte";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import { Separator } from "@/components/ui/separator";
	import * as DropdownMenu from "@/components/ui/dropdown-menu";
	import { Ellipsis } from "lucide-svelte";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import { toast } from "svelte-sonner";

	let selectedWorkoutState = getSelectedWorkoutState();
	let allWorkoutState = getAllWorkoutState();
	let { workouts, create_mode = $bindable() }: { workouts: Workout[]; create_mode: boolean } =
		$props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			selectedWorkoutState.clear();
			create_mode = false;
		}
	}

	onMount(() => {
		window.addEventListener("keydown", handleKeydown);
		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	});

	async function handleDeleteWorkout(workout: Workout) {
		const response = await fetch(`/api/workouts`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: workout.id })
		});

		if (response.ok) {
			allWorkoutState.remove(workout);
			selectedWorkoutState.clear();
			create_mode = false;

			toast.success(`Workout ${workout.name} Deleted!`);
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
		{#if selectedWorkoutState.workout?.id !== workout.id}
			<button
				class={cn(
					"relative flex flex-col items-start gap-2 rounded-lg border bg-muted/25 p-3 text-left text-sm transition-all hover:scale-105 hover:bg-accent",
					selectedWorkoutState.workout?.id === workout.id && "bg-muted"
				)}
				onclick={() => {
					selectedWorkoutState.set(workout);
					create_mode = false;
				}}
			>
				<div class="flex w-full flex-col gap-1">
					<div class="flex items-center">
						<div class="flex items-center gap-2">
							<div class="truncate text-xs font-semibold">
								{workout.name}
							</div>
							<span class="truncate text-xs text-slate-400"> 0 Exercises </span>
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
							<button
								class={cn("bg-transparent hover:scale-150")}
								onclick={(e) => e.stopPropagation()}
							>
								<Ellipsis size="20" />
							</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item
								onclick={() => {
									console.log("Delete");
									handleDeleteWorkout(workout);
								}}>Delete</DropdownMenu.Item
							>
							<DropdownMenu.Item>🚧 Duplicate</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</button>
		{/if}
	{/each}
</div>
