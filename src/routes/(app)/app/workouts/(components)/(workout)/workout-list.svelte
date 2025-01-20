<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Workout } from "@/schemas/workouts.js";
	import { onMount } from "svelte";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import { Separator } from "@/components/ui/separator";

	let selectedWorkoutState = getSelectedWorkoutState();
	let { workouts }: { workouts: Workout[] } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			selectedWorkoutState.clear();
		}
	}

	onMount(() => {
		window.addEventListener("keydown", handleKeydown);
		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	});
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
					"flex flex-col items-start gap-2 rounded-lg border bg-muted/25 p-3 text-left text-sm transition-all hover:scale-105 hover:bg-accent",
					selectedWorkoutState.workout?.id === workout.id && "bg-muted"
				)}
				onclick={() => selectedWorkoutState.set(workout)}
			>
				<div class="flex w-full flex-col gap-1">
					<div class="flex items-center">
						<div class="flex items-center gap-2">
							<div class="font-semibold">
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
				<div class="max-w-full truncate text-ring">{workout.description}</div>
			</button>
		{/if}
	{/each}
</div>
