<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Workout } from "@/schemas/workouts.js";
	import { ScrollArea } from "@/components/ui/scroll-area/index.js";
	import { onMount } from "svelte";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";

	let selectedWorkoutState = getSelectedWorkoutState();

	export let workouts: Workout[];

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

<ScrollArea class="h-screen">
	<div class="flex flex-col gap-2 p-4 pt-2">
		{#each workouts as workout}
			<button
				class={cn(
					"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
					selectedWorkoutState.workout?.id === workout.id && "bg-muted"
				)}
				onclick={() => {
					selectedWorkoutState.set(workout);
				}}
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
				<div class="text-ring">{workout.description}</div>
			</button>
		{/each}
	</div>
</ScrollArea>
