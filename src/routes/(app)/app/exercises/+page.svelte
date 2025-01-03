<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { type PageData } from './$types';
	import { routeStore } from '@/stores/route.store';
	import CreateExerciseCard from '@/components/createExerciseCard.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import Separator from '@/components/ui/separator/separator.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Search from 'lucide-svelte/icons/search';
	import { Input } from '$lib/components/ui/input/index.js';
	import ExerciseList from './(components)/exercise-list.svelte';
	import { on } from 'events';
	import { onDestroy } from 'svelte';
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';

	export let data: PageData;

	routeStore.set('Exercises');

	let exercises = data.exercises;

	export let defaultLayout = [60, 40];
	export let defaultCollapsed = false;
	let isCollapsed = defaultCollapsed;

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
					<Separator />
				</div>

				<!-- Scrollable Content -->
				<div class="flex-1 overflow-auto">
					<Tabs.Content value="all" class="m-0 h-full">
						<div class="mt-4 h-full">
							<ExerciseList {exercises} />
						</div>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>

<!-- Extra pane with a different card layout  -->

<!-- 
		<Resizable.Handle withHandle />

		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={10} class="h-full overflow-hidden">
			<ScrollArea  class="h-full oveflow-auto">
			{#if exercises.length > 0}
	<div class="mt-12 grid gap-8 justify-center">
		{#each exercises as exercise}
		<Card.Card class="w-[320px] border rounded-lg shadow-md overflow-hidden relative">
			<Card.CardHeader>
				<Card.CardTitle class="text-xl font-bold text-white">{exercise.name}</Card.CardTitle>
				<Card.CardDescription class="text-sm text-white">{exercise.note}</Card.CardDescription>
			</Card.CardHeader>
			<Card.CardContent class="p-4 space-y-4">
				<div>
					<p class="text-sm text-white border rounded-md px-3 py-1 w-fit">
						{exercise.movement_type}
					</p>
				</div>
				<div class="flex gap-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
					{#each exercise.muscle_groups as group (group)}
						<span
							class=" whitespace-nowrap"
						>
						<Badge>{group}</Badge>
						</span>
						
					{/each}
				</div>
				<div>
					<h3 class="text-md font-semibold text-white">Instructions</h3>
					<div class="border rounded-md p-3 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
						<ul class="space-y-2">
							{#each exercise.instructions as instruction}
							<li class="text-sm text-white border rounded-md p-2">
								{instruction}
							</li>
							{/each}
						</ul>
					</div>
				</div>
			</Card.CardContent>
			<div class="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
				<button class="p-1 bg-gray-200 hover:bg-gray-300 rounded-full" aria-label="Edit">
					<svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
					</svg>
				</button>
				<button class="p-1 bg-red-200 hover:bg-red-300 rounded-full" aria-label="Delete">
					<svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
					</svg>
				</button>
			</div>
		</Card.Card>
		{/each}
		
	</div>
	
{:else}
	<p>No exercises found</p>
{/if}
</ScrollArea>

		</Resizable.Pane> -->
