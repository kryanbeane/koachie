<script lang="ts">
	import { routeStore } from "@/stores/route.store";
	import * as Resizable from "$lib/components/ui/resizable";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import WorkoutList from "./(components)/(workout)/workout-list.svelte";
	import type { PageData } from "./$types";
	import { Button } from "@/components/ui/button";
	import SearchFilterWorkouts from "./(components)/(workout-list)/search-filter-workouts.svelte";
	import WorkoutSidePanel from "./(components)/(workout)/workout-side-panel.svelte";
	import { Dumbbell } from "lucide-svelte";

	let { data }: { data: PageData } = $props();

	let workoutsState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	let searchQuery = $state("");

	workoutsState.set(data.workouts);
	routeStore.set("Workouts");

	let filteredWorkouts = $derived(
		workoutsState.workouts.filter((workout) =>
			workout.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	let create_mode = $state(false);
</script>

<!-- TODO: Add caching to pane sizes -->
<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={24} minSize={24}>
		<SearchFilterWorkouts bind:searchQuery />
		<WorkoutList workouts={filteredWorkouts} bind:create_mode />
		<div class="justify-left flex px-4">
			<Button
				variant="default"
				size="xs"
				onclick={() => {
					create_mode = true;
					selectedWorkoutState.clear();
				}}
			>
				<Dumbbell class="h-4 w-4" />
				Add Workout
			</Button>
		</div>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane
		minSize={24}
		defaultSize={100}
		class="flex h-full flex-grow items-center justify-center p-6"
	>
		<WorkoutSidePanel bind:create_mode {data} />
	</Resizable.Pane>
</Resizable.PaneGroup>
