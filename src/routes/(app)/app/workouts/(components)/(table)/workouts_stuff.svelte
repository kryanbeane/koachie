<script lang="ts">
	import Search from 'lucide-svelte/icons/search';
	import * as Resizable from '$lib/components/ui/resizable';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '@/components/ui/separator';
	import type { Workout } from '@/schemas/workouts';
	import { Input } from '@/components/ui/input';
	import WorkoutDisplay from './workout-display.svelte';
	import { workoutStore } from './store';
	import WorkoutList from './workout-list.svelte';

	export let workouts: Workout[];
	export let defaultLayout = [265, 440, 60];
	// export let defaultCollapsed = false;
	// export let navCollapsedSize: number;

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}
</script>

<div class="hidden md:block">
	<Resizable.PaneGroup
		direction="horizontal"
		{onLayoutChange}
		class="h-full max-h-[800px] items-stretch"
	>
		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
			<Tabs.Root value="all">
				<div class="flex items-center px-4 py-2">
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
						<Tabs.Trigger value="all" class="text-zinc-600 dark:text-zinc-200">
							All mail
						</Tabs.Trigger>
						<Tabs.Trigger value="unread" class="text-zinc-600 dark:text-zinc-200">
							Unread
						</Tabs.Trigger>
					</Tabs.List>
				</div>
				<Separator />

				<Tabs.Content value="all" class="m-0">
					<WorkoutList items={workouts} />
				</Tabs.Content>
			</Tabs.Root>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={defaultLayout[2]}>
			<WorkoutDisplay
				workout={workouts.find((item) => item.id === $workoutStore.selected) || null}
			/>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
