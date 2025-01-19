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
	import {
		ChevronFirst,
		ChevronLast,
		ChevronLeft,
		ChevronRight,
		Filter,
		User
	} from "lucide-svelte";
	import { Button, buttonVariants } from "@/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Pagination from "$lib/components/ui/pagination";

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

	let isWorkoutSelected = $derived(!!selectedWorkoutState.workout);
	let collapsed = false;
</script>

<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="h-full overflow-hidden">
	<Resizable.Pane
		defaultSize={isWorkoutSelected ? 32 : 1000}
		minSize={isWorkoutSelected ? 24 : 1000}
		maxSize={isWorkoutSelected ? 48 : 1000}
		class="flex flex-col"
	>
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
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							class={`${buttonVariants({ variant: "secondary", size: "icon" })} ml-2`}
						>
							<Filter />
						</DropdownMenu.Trigger>

						<DropdownMenu.Content class="w-56">
							<DropdownMenu.Group>
								<DropdownMenu.GroupHeading>Filter</DropdownMenu.GroupHeading>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>
									<User class="mr-2 size-4" />
									<span>Profile</span>
									<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</form>
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

	{#if isWorkoutSelected}
		<Resizable.Handle />
		<Resizable.Pane
			onCollapse={() => selectedWorkoutState.clear()}
			defaultSize={200}
			minSize={200}
			class="inset-y-0 right-0 z-50 h-full border-l transition ease-in-out data-[state=isCollapsed]:duration-300 data-[state=isExpanded]:duration-500 data-[state=isExpanded]:animate-in data-[state=isCollapsed]:animate-out data-[state=isCollapsed]:slide-out-to-right data-[state=isExpanded]:slide-in-from-right sm:max-w-sm"
		>
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
	{/if}
</Resizable.PaneGroup>
