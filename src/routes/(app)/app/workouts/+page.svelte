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
	import { page } from "$app/state";
	import { goto } from "$app/navigation";

	let { data }: { data: PageData } = $props();

	let workoutsState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	let searchQuery = $state("");

	workoutsState.set(data.workoutsWithInstances);
	routeStore.set("Workouts");

	let filteredWorkouts = $derived(
		workoutsState.workouts.filter((workout) =>
			workout.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<!-- TODO: Add caching to pane sizes -->
<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={24} minSize={24}>
		<SearchFilterWorkouts bind:searchQuery />
		<div class="justify-left flex px-4">
			<Button
				variant="default"
				size="xs"
				onclick={() => {
					selectedWorkoutState.clear();
					goto(`${page.url.pathname}?mode=create`);
				}}
			>
				<Dumbbell class="h-4 w-4" />
				Add Workout
			</Button>
		</div>
		<WorkoutList workouts={filteredWorkouts} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane
		minSize={24}
		defaultSize={100}
		class="flex h-full flex-grow items-center justify-center p-6"
	>
		<WorkoutSidePanel {data} />
	</Resizable.Pane>
</Resizable.PaneGroup>
