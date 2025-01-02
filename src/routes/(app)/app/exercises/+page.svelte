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

	export let data: PageData;

	routeStore.set('Exercises');

	let exercises = data.exercises;

	export let defaultLayout = [70, 30];
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

<div class="h-full w-full flex-1">
	<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="h-full w-full">
		<Resizable.Pane defaultSize={defaultLayout[0]} minSize={10} class="h-full">
			<Tabs.Root value="all">
				<div class="flex items-center px-6 py-2">
					<div
						class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
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

				<Tabs.Content value="all" class="m-0">
					{#if exercises.length > 0}
						<div class="mt-12 grid justify-center gap-8">
							{#each exercises as exercise}
								<Card.Card class="relative w-[320px] overflow-hidden rounded-lg border shadow-md">
									<Card.CardHeader>
										<Card.CardTitle class="text-xl font-bold text-white"
											>{exercise.name}</Card.CardTitle
										>
										<Card.CardDescription class="text-sm text-white"
											>{exercise.note}</Card.CardDescription
										>
									</Card.CardHeader>
									<Card.CardContent class="space-y-4 p-4">
										<div>
											<p class="w-fit rounded-md border px-3 py-1 text-sm text-white">
												{exercise.movement_type}
											</p>
										</div>
										<div
											class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
										>
											{#each exercise.muscle_groups as group (group)}
												<span class=" whitespace-nowrap">
													<Badge>{group}</Badge>
												</span>
											{/each}
										</div>
										<div>
											<h3 class="text-md font-semibold text-white">Instructions</h3>
											<div
												class="scrollbar-thin scrollbar-thumb-gray-400 max-h-32 overflow-y-auto rounded-md border p-3"
											>
												<ul class="space-y-2">
													{#each exercise.instructions as instruction}
														<li class="rounded-md border p-2 text-sm text-white">
															{instruction}
														</li>
													{/each}
												</ul>
											</div>
										</div>
									</Card.CardContent>
									<div
										class="absolute right-3 top-3 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100"
									>
										<button
											class="rounded-full bg-gray-200 p-1 hover:bg-gray-300"
											aria-label="Edit"
										>
											<svg
												class="h-[20px] w-[20px] text-gray-800 dark:text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="1.1"
													d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
												/>
											</svg>
										</button>
										<button
											class="rounded-full bg-red-200 p-1 hover:bg-red-300"
											aria-label="Delete"
										>
											<svg
												class="h-[20px] w-[20px] text-gray-800 dark:text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="1.1"
													d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
												/>
											</svg>
										</button>
									</div>
								</Card.Card>
							{/each}
						</div>
					{:else}
						<p>No exercises found</p>
					{/if}
				</Tabs.Content>
				<Tabs.Content value="unread" class="m-0">
					<!-- <MailList items={mails.filter((item) => !item.read)} /> -->
				</Tabs.Content>
			</Tabs.Root>
		</Resizable.Pane>

		<Resizable.Handle withHandle />

		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={10} class="h-full">
			<div class="flex h-full items-center justify-center bg-gray-200">
				<p>Pane 2</p>
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>

{#if exercises.length > 0}
	<div class="mt-12 grid justify-center gap-8">
		{#each exercises as exercise}
			<Card.Card class="relative w-[320px] overflow-hidden rounded-lg border shadow-md">
				<Card.CardHeader>
					<Card.CardTitle class="text-xl font-bold text-white">{exercise.name}</Card.CardTitle>
					<Card.CardDescription class="text-sm text-white">{exercise.note}</Card.CardDescription>
				</Card.CardHeader>
				<Card.CardContent class="space-y-4 p-4">
					<div>
						<p class="w-fit rounded-md border px-3 py-1 text-sm text-white">
							{exercise.movement_type}
						</p>
					</div>
					<div
						class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
					>
						{#each exercise.muscle_groups as group (group)}
							<span class=" whitespace-nowrap">
								<Badge>{group}</Badge>
							</span>
						{/each}
					</div>
					<div>
						<h3 class="text-md font-semibold text-white">Instructions</h3>
						<div
							class="scrollbar-thin scrollbar-thumb-gray-400 max-h-32 overflow-y-auto rounded-md border p-3"
						>
							<ul class="space-y-2">
								{#each exercise.instructions as instruction}
									<li class="rounded-md border p-2 text-sm text-white">
										{instruction}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</Card.CardContent>
				<div
					class="absolute right-3 top-3 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<button class="rounded-full bg-gray-200 p-1 hover:bg-gray-300" aria-label="Edit">
						<svg
							class="h-[20px] w-[20px] text-gray-800 dark:text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.1"
								d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
							/>
						</svg>
					</button>
					<button class="rounded-full bg-red-200 p-1 hover:bg-red-300" aria-label="Delete">
						<svg
							class="h-[20px] w-[20px] text-gray-800 dark:text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.1"
								d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
							/>
						</svg>
					</button>
				</div>
			</Card.Card>
		{/each}
	</div>
{:else}
	<p>No exercises found</p>
{/if}
