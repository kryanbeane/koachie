<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	import { cn } from '$lib/utils.js';

	export let exercises;

	// Handle main click on the card
	function handleExerciseClick(exercise: { id: number }) {
		console.log('Exercise clicked:', exercise.id);
	}

	// Handle edit button click
	function handleEdit(event: Event, exercise: { id: number }) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log('Edit clicked for:', exercise.id);
	}

	// Handle delete button click
	function handleDelete(event: Event, exercise: { id: number }) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log('Delete clicked for:', exercise.id);
	}
</script>

<ScrollArea class="h-full overflow-hidden">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each exercises as exercise}
			<!-- Card Wrapper -->
			<div
				class={cn(
					'group relative flex items-start gap-4 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
					'bg-muted'
				)}
				tabindex="0"
				role="button"
				on:click={() => handleExerciseClick(exercise)}
				on:keydown={(e) => e.key === 'Enter' && handleExerciseClick(exercise)}
			>
				<!-- Hover Buttons -->
				<div
					class="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<button
						class="rounded-full bg-gray-200 p-1 hover:bg-gray-300"
						aria-label="Edit"
						on:click={(e) => handleEdit(e, exercise)}
					>
						<svg
							class="h-4 w-4 text-gray-800"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
							/>
						</svg>
					</button>
					<button
						class="rounded-full bg-red-200 p-1 hover:bg-red-300"
						aria-label="Delete"
						on:click={(e) => handleDelete(e, exercise)}
					>
						<svg
							class="h-4 w-4 text-gray-800"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
							/>
						</svg>
					</button>
				</div>

				<!-- Main Content -->
				<div class="flex w-full justify-between">
					<!-- Left Section (Details) -->
					<div class="flex w-[55%] flex-col gap-1">
						<div class="flex items-center">
							<div class="font-semibold">{exercise.name}</div>
						</div>
						<div class="text-xs font-medium">{exercise.movement_type}</div>
						<div class="line-clamp-2 text-xs text-muted-foreground">
							{exercise.note.substring(0, 300)}
						</div>
						{#if exercise.muscle_groups.length}
							<div class="flex items-center gap-2">
								{#each exercise.muscle_groups as group}
									<Badge>
										{group}
									</Badge>
								{/each}
							</div>
						{/if}
					</div>

					<div class="w-[40%]">
						<div
							class="scrollbar-thin scrollbar-thumb-gray-200 max-h-24 overflow-y-auto rounded-md border-2 border-gray-500 p-1"
						>
							<h3 class="text-md text-center font-semibold text-white underline">Instructions</h3>
							<ul class="space-y-2">
								{#each exercise.instructions as instruction}
									<li class="rounded-md border border-gray-500 p-1 text-center text-sm text-white">
										{instruction}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</ScrollArea>

<!-- <ScrollArea class="h-screen">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each exercises as exercise}
			<button
				class={cn(
					"hover:bg-accent flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all",
				 "bg-muted"
				)}>
				on:click={() => mailStore.setMail(item.id)}

                
			
				<div class="flex w-full flex-col gap-1">
					<div class="flex items-center">
						<div class="flex items-center gap-2">
							<div class="font-semibold">{exercise.name}</div>
							{#if !item.read}
								<span class="flex h-2 w-2 rounded-full bg-blue-600" />
							{/if}
						</div>
						<div
							class={cn(
								"ml-auto text-xs",
								$mailStore.selected === item.id
									? "text-foreground"
									: "text-muted-foreground"
							)}
						>
							{formatTimeAgo(new Date(item.date))}
						</div>
					</div>
					<div class="text-xs font-medium">{exercise.movement_type}</div>
				</div>
				<div class="text-muted-foreground line-clamp-2 text-xs">
					{exercise.note.substring(0, 300)}
				</div>
				{#if exercise.muscle_groups.length}
					<div class="flex items-center gap-2">
						{#each exercise.muscle_groups as group}
							<Badge>
								{group}
							</Badge>
						{/each}
					</div>
				{/if}
                
			</button>
           
		{/each}
	</div>
</ScrollArea> -->
