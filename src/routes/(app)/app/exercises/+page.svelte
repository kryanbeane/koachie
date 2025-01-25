<script lang="ts">
	import { type PageData } from "./$types";
	import { routeStore } from "@/stores/route.store";
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import Separator from "@/components/ui/separator/separator.svelte";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import Search from "lucide-svelte/icons/search";
	import { Input } from "$lib/components/ui/input/index.js";
	import ExerciseList from "./(components)/exercise-list.svelte";
	import ExerciseCard from "./(components)/exercise-card.svelte";
	import { onMount } from "svelte";
	import type { Exercise } from "@/schemas/exercises";
	import { getAllExerciseState } from "@/stores/all_exercise_state.svelte";
	import * as DropdownMenu from "@/components/ui/dropdown-menu";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { Move } from "lucide-svelte";
	import MovementTypeSelect from "@/components/movement-type-select.svelte";
	import { filteredMovementTypes } from "@/stores/filtered_movement_types.svelte";
	import { filteredMuscleGroups } from "@/stores/filtered_muscle_groups.svelte";
	import MuscleGroupSelect from "@/components/muscle-group-select.svelte";
	import Badge from "@/components/ui/badge/badge.svelte";
	import { filteredSortMethods } from "@/stores/filtered_sort_methods.svelte";
	import SortBySelect from "@/components/sort-by-select.svelte";
	import Button from "@/components/ui/button/button.svelte";

	let searchQuery = $state("");

	filteredMuscleGroups.set({
		muscle_groups: []
	});

	filteredMovementTypes.set({
		movement_type: ""
	});

	filteredSortMethods.set({
		sort_by: ""
	});

	let {
		data,
		defaultLayout = [60, 40],
		defaultCollapsed
	}: {
		data: PageData;
		defaultLayout: number[];
		defaultCollapsed: boolean;
	} = $props();

	let createMode = $state(false);

	routeStore.set("Exercises");

	let exercisesState = getAllExerciseState();
	exercisesState.set(data.exercises);

	let filteredExercises = $derived(
		exercisesState.exercises
			.filter((exercise) => exercise.name.toLowerCase().includes(searchQuery.toLowerCase()))
			.filter((exercise) => {
				if ($filteredMovementTypes.movement_type !== "") {
					return (
						exercise.movement_type.toLowerCase() ===
						$filteredMovementTypes.movement_type.toLowerCase()
					);
				}
				return true;
			})
			.filter((exercise) => {
				if ($filteredMuscleGroups.muscle_groups.length > 0) {
					return $filteredMuscleGroups.muscle_groups.some((group) =>
						exercise.muscle_groups.includes(group)
					);
				}
				return true;
			})
			.sort((a, b) => {
				if ($filteredSortMethods.sort_by === "name") {
					return a.name.localeCompare(b.name);
				} else if ($filteredSortMethods.sort_by === "created_at") {
					return new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime();
				} else if ($filteredSortMethods.sort_by === "updated_at") {
					return new Date(a.updated_at ?? 0).getTime() - new Date(b.updated_at ?? 0).getTime();
				}
				return 0;
			})
	);

	let isCollapsed = defaultCollapsed;

	let exercise: Exercise = {
		id: "1",
		created_at: "2021-09-01T00:00:00.000Z",
		updated_at: "2021-09-01T00:00:00.000Z",
		name: "Push-up",
		note: "Hello",
		instructions: ["Step 1", "Step 2", "Step 3"],
		muscle_groups: ["Chest", "Triceps"],
		movement_type: "Strength",
		video: "",
		coach_id: "1"
	};

	function checkScreenSize() {
		isCollapsed = window.innerWidth < 640; // Adjust breakpoint as needed
	}

	// Attach event listener for dynamic resizing
	onMount(() => {
		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	});

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function toggleExerciseCard() {
		createMode = !createMode; // Toggle visibility
		console.log("Toggle Exercise Card", createMode);
	}
	function clearFilters() {
		filteredMovementTypes.set({
			movement_type: ""
		});
		filteredMuscleGroups.set({
			muscle_groups: []
		});
		filteredSortMethods.set({
			sort_by: ""
		});
	}
</script>

<div class="h-full w-full flex-1 overflow-hidden">
	<Resizable.PaneGroup
		direction="horizontal"
		{onLayoutChange}
		class="h-full w-full overflow-hidden"
	>
		<Resizable.Pane defaultSize={defaultLayout[0]} minSize={10} class="h-full overflow-hidden">
			<Tabs.Root value="all" class="flex h-full flex-col">
				<!-- Static Header: Search bar and filter buttons -->
				<div class="relative flex-shrink-0">
					<div class="flex items-center px-6 py-2">
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							class="rounded-md p-2 transition-all duration-200 ease-in-out
						{!createMode ? 'bg-green-600 hover:bg-green-500 active:bg-green-700' : 'bg-accent'} {createMode
								? 'bg-gray-600'
								: 'bg-accent'} 
						text-white"
							onclick={toggleExerciseCard}
						>
							{#if createMode}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-minus"><path d="M5 12h14" /></svg
								>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg
								>
							{/if}
						</button>
						<div
							class="w-1/3 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
						>
							<form>
								<div class="relative">
									<Search
										class="absolute left-2 top-[50%] h-4 translate-y-[-50%] text-muted-foreground"
									/>
									<Input placeholder="Search" class="pl-8" bind:value={searchQuery} />
								</div>
							</form>
						</div>

						<div class=" relative ml-auto flex items-center gap-4">
							<div
								class=" scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex max-w-[300px] gap-2 overflow-x-auto py-2"
							>
								{#if $filteredMovementTypes.movement_type}
									<span class=" whitespace-nowrap">
										<Badge class="bg-green-600">{$filteredMovementTypes.movement_type}</Badge>
									</span>
								{/if}

								{#each $filteredMuscleGroups.muscle_groups as group}
									<span class=" whitespace-nowrap">
										<Badge>{group}</Badge>
									</span>
								{/each}
							</div>
						</div>

						<div class="relative ml-2 text-right">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-filter"
										><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg
									>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content class=" absolute right-0 mr-4 w-[250px]">
									<DropdownMenu.Group>
										<div class="mt-2">
											<SortBySelect data={filteredSortMethods} props={null} />
										</div>
										<div class="mt-2">
											<MovementTypeSelect data={filteredMovementTypes} props={null} />
										</div>
										<div class="mt-2">
											<MuscleGroupSelect data={filteredMuscleGroups} props={null} />
										</div>
										<div class="mt-2">
											<Button class="sm w-full" onclick={() => clearFilters()}>Clear Filters</Button
											>
										</div>
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
					</div>

					{#if createMode}
						<div class="p-4">
							<ExerciseCard
								{exercisesState}
								ex={data.ex}
								exercise={{
									name: "",
									note: "",
									movement_type: "",
									muscle_groups: [],
									instructions: [],
									video: ""
								}}
								editMode={false}
								bind:createMode
							/>
						</div>
					{/if}

					<Separator />
				</div>

				<!-- Scrollable Content -->
				<div class="flex-1 overflow-auto">
					<Tabs.Content value="all" class="m-0 h-full">
						<div class="mt-4 h-full">
							<ExerciseList ex={data.ex} {exercisesState} {filteredExercises} />
						</div>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
