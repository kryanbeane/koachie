<script lang="ts">
	import { workoutStore } from './store.js';
	import { cn } from '$lib/utils.js';
	import type { Workout } from '@/schemas/workouts.js';
	import { ScrollArea } from '@/components/ui/scroll-area/index.js';
	import { formatTimeAgo } from './utils.js';
	export let items: Workout[];
</script>

<ScrollArea class="h-screen">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each items as item}
			<button
				class={cn(
					'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
					$workoutStore.selected === item.id && 'bg-muted'
				)}
				on:click={() => workoutStore.setWorkout(item.id)}
			>
				<div class="flex w-full flex-col gap-1">
					<div class="flex items-center">
						<div class="flex items-center gap-2">
							<div class="font-semibold">{item.name}</div>
						</div>
						<div
							class={cn(
								'ml-auto text-xs',
								$workoutStore.selected === item.id ? 'text-foreground' : 'text-muted-foreground'
							)}
						>
							{formatTimeAgo(new Date(item.created_at))}
						</div>
					</div>
				</div>
			</button>
		{/each}
	</div>
</ScrollArea>
