<script lang="ts">
	import { buttonVariants } from '@/components/ui/button/index';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { Separator } from '@/components/ui/separator';
	import * as Tooltip from '@/components/ui/tooltip/index';
	import type { Workout } from '@/schemas/workouts';
	import { EllipsisVertical, Trash2 } from 'lucide-svelte';
	import WorkoutCard from '../workout_card.svelte';

	export let workout: Workout | null = null;
</script>

<div class="flex h-full flex-col">
	<div class="mb-1 flex items-center p-2">
		<div class="ml-auto flex items-center gap-2">
			<Tooltip.Root>
				<Tooltip.Trigger
					id="move_to_trash_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!workout}
				>
					<Trash2 class="size-4" />
					<span class="sr-only">Delete Workout</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Delete Workout</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<Separator orientation="vertical" class="mx-2 h-6" />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				id="more_options_dropdown"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				disabled={!workout}
			>
				<EllipsisVertical class="size-4" />
				<span class="sr-only">More</span>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item>Mark as unread</DropdownMenu.Item>
				<DropdownMenu.Item>Star thread</DropdownMenu.Item>
				<DropdownMenu.Item>Add label</DropdownMenu.Item>
				<DropdownMenu.Item>Mute thread</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<Separator />
	{#if workout}
		<WorkoutCard {workout} />
	{:else}
		<div class="p-8 text-center text-muted-foreground">No workout selected</div>
	{/if}
</div>
