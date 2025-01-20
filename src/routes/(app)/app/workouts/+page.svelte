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

	$inspect("filteredWorkouts", filteredWorkouts);

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	let create_workout_mode = $state(false);
	let edit_workout_mode = $state(false);

	$effect(() => {
		if (create_workout_mode) {
			edit_workout_mode = false;
		}
		if (edit_workout_mode) {
			create_workout_mode = false;
		}
	});
</script>

<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={20} minSize={20}>
		<SearchFilterWorkouts bind:searchQuery />
		<WorkoutList workouts={filteredWorkouts} />
		<div class="justify-left flex px-4">
			<Button
				variant="default"
				size="xs"
				onclick={() => {
					create_workout_mode = true;
					selectedWorkoutState.set({ id: "", name: "", description: "" });
				}}
			>
				<Dumbbell class="h-4 w-4" />
				Add Workout
			</Button>
		</div>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={100} class="flex-grow">
		{#if selectedWorkoutState.workout}
			<div class="flex h-full items-center justify-center p-6">
				<WorkoutSidePanel
					{workoutsState}
					data={data.form}
					workout={workoutsState.workouts?.find(
						(item) => item.id === selectedWorkoutState.workout?.id
					)!!}
				/>
			</div>
		{:else}
			<div class="flex h-full items-center justify-center p-6">
				<span class="font-semibold">No Workouts Selected</span>
			</div>
		{/if}
	</Resizable.Pane>
</Resizable.PaneGroup>

<!-- 
<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="h-full overflow-hidden">

	<Resizable.Handle />
	<Resizable.Pane
		class="inset-y-0 right-0 z-50 h-full border-l transition ease-in-out data-[state=isCollapsed]:duration-300 data-[state=isExpanded]:duration-500 data-[state=isExpanded]:animate-in data-[state=isCollapsed]:animate-out data-[state=isCollapsed]:slide-out-to-right data-[state=isExpanded]:slide-in-from-right sm:max-w-sm"
	>
		<WorkoutSidePanel
			{workoutsState}
			data={data.form}
			workout={workoutsState.workouts?.find(
				(item) => item.id === selectedWorkoutState.workout?.id
			)!!}
		/>
	</Resizable.Pane>
</Resizable.PaneGroup> -->
