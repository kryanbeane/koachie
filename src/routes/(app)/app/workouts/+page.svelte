<script lang="ts">
	import { routeStore } from "@/stores/route.store";
	import * as Resizable from "$lib/components/ui/resizable";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import WorkoutList from "./(components)/(workout)/workout-list.svelte";
	import type { PageData } from "./$types";
	import SearchFilterWorkouts from "./(components)/(workout-list)/search-filter-workouts.svelte";
	import { Button } from "@/components/ui/button";

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

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}
</script>

<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={32} minSize={32}>
		<SearchFilterWorkouts bind:searchQuery />
		<WorkoutList workouts={filteredWorkouts} />
		<div class="flex justify-center">
			<Button variant="secondary" size="xs">Add Workout</Button>
		</div>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={75} class="flex-grow">
		<div class="flex h-full items-center justify-center p-6">
			<span class="font-semibold">No Workouts Selected</span>
		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>

<!-- 
<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="h-full overflow-hidden">
	<Resizable.Pane defaultSize={48} minSize={48} maxSize={48} class="flex flex-col">
		<div class="flex items-center px-4">
			<div
				class="flex w-full items-center bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
			>
				
			</div>
		</div>

		<Separator class="my-2" />

		<div class="flex-grow overflow-auto">
			<WorkoutList workouts={filteredWorkouts} />
		</div>

		<Separator class="my-2" />

		<Pagination.Root count={30} perPage={10} class="mb-2">
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === "ellipsis"}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</Resizable.Pane>

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
