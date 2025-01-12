<script lang="ts">
	import { type PageData } from './$types';
	import { routeStore } from '@/stores/route.store';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import Separator from '@/components/ui/separator/separator.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Search from 'lucide-svelte/icons/search';
	import { Input } from '$lib/components/ui/input/index.js';
	import ExerciseList from './(components)/exercise-list.svelte';
	import ExerciseCard from './(components)/exercise-card.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	let createMode = false;

	routeStore.set('Exercises');

	let exercises = data.exercises;

	export let defaultLayout = [60, 40];
	export let defaultCollapsed = false;
	let isCollapsed = defaultCollapsed;

	function checkScreenSize() {
		isCollapsed = window.innerWidth < 640; // Adjust breakpoint as needed
	}

	// Attach event listener for dynamic resizing
	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	});

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}

	function toggleExerciseCard() {
		createMode = !createMode; // Toggle visibility
		console.log('Toggle Exercise Card', createMode);
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
				<div class="flex-shrink-0">
					<div class="flex items-center px-6 py-2">
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							class="rounded-md p-2 transition-all duration-200 ease-in-out
						{!createMode ? 'bg-green-600 hover:bg-green-500 active:bg-green-700' : 'bg-accent'} {createMode
								? 'bg-gray-600'
								: 'bg-accent'} 
						text-white"
							on:click={toggleExerciseCard}
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
							class="w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
						>
							<form>
								<div class="relative">
									<Search
										class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
									/>
									<Input placeholder="Search" class="pl-8" />
								</div>
							</form>
						</div>
						<Tabs.List class="ml-auto">
							<Tabs.Trigger value="all" class="text-zinc-600 dark:text-zinc-200">All</Tabs.Trigger>
							<Tabs.Trigger value="added" class="text-zinc-600 dark:text-zinc-200">
								Date added
							</Tabs.Trigger>
							<Tabs.Trigger value="modified" class="text-zinc-600 dark:text-zinc-200">
								Date modified
							</Tabs.Trigger>
						</Tabs.List>
					</div>

					{#if createMode}
						<div class="p-4">
							<ExerciseCard
								ex={data.ex}
								exercise={{
									name: '',
									note: '',
									movement_type: '',
									muscle_groups: [],
									instructions: [],
									video: ''
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
							<ExerciseList ex={data.ex} {exercises} />
						</div>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
ur m
