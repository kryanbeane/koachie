<script lang="ts">
	import { routeStore } from "@/stores/route.store";
	import * as Resizable from "$lib/components/ui/resizable";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import Search from "lucide-svelte/icons/search";
	import { Separator } from "@/components/ui/separator";
	import { Input } from "@/components/ui/input";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import WorkoutList from "./(components)/(workout)/workout-list.svelte";
	import WorkoutSidePanel from "./(components)/(workout)/workout-side-panel.svelte";
	import type { PageData } from "./$types";
	import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Filter } from "lucide-svelte";
	import Button from "@/components/ui/button/button.svelte";

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

	let defaultLayout = [265, 440, 60];

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}
</script>

<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="h-full overflow-hidden">
	<Resizable.Pane defaultSize={24} minSize={24} maxSize={24} class="flex flex-col">
		<div class="flex items-center px-4">
			<div
				class="flex w-full items-center bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
			>
				<form class="flex w-full items-center">
					<div class="relative flex-grow">
						<Search
							class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
						/>
						<Input placeholder="Search" class="w-full pl-8" bind:value={searchQuery} />
					</div>
					<Button variant="secondary" size="icon" class="ml-2"><Filter /></Button>
				</form>
			</div>
		</div>

		<Separator class="my-2" />

		<div class="flex-grow overflow-auto">
			<WorkoutList workouts={filteredWorkouts} />
		</div>

		<Separator class="my-2" />

		<div class="flex w-full items-center justify-between px-4 py-2">
			<Button variant="outline" size="icon"><ChevronFirst /></Button>
			<Button variant="outline" size="icon"><ChevronLeft /></Button>
			<span>1 of 1</span>
			<Button variant="outline" size="icon"><ChevronRight /></Button>
			<Button variant="outline" size="icon"><ChevronLast /></Button>
		</div>
	</Resizable.Pane>
	<Separator orientation="vertical" />
	<Resizable.Pane defaultSize={defaultLayout[1]} minSize={200} class="flex flex-col">
		{#if workoutsState.workouts?.find((item) => item.id === selectedWorkoutState.workout?.id)!!}
			<WorkoutSidePanel
				{workoutsState}
				data={data.form}
				workout={workoutsState.workouts?.find(
					(item) => item.id === selectedWorkoutState.workout?.id
				)!!}
			/>
		{/if}
	</Resizable.Pane>
</Resizable.PaneGroup>
