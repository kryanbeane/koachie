<script lang="ts">
	import { routeStore } from "@/stores/route.store";
	import * as Resizable from "$lib/components/ui/resizable";
	import * as Tabs from "$lib/components/ui/tabs";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import Search from "lucide-svelte/icons/search";
	import { Separator } from "@/components/ui/separator";
	import { Input } from "@/components/ui/input";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import WorkoutList from "./(components)/(workout)/workout-list.svelte";
	import WorkoutSidePanel from "./(components)/(workout)/workout-side-panel.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let workoutsState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	workoutsState.set(data.workouts);
	routeStore.set("Workouts");

	let defaultLayout = [265, 440, 60];

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}
</script>

<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="h-full overflow-hidden">
	<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
		<Tabs.Root value="all">
			<div class="flex items-center px-4">
				<div
					class="bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
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
					<Tabs.Trigger value="all" class="text-zinc-600 dark:text-zinc-200">All mail</Tabs.Trigger>
					<Tabs.Trigger value="unread" class="text-zinc-600 dark:text-zinc-200">
						Unread
					</Tabs.Trigger>
				</Tabs.List>
			</div>
			<Separator class="my-2" />

			<Tabs.Content value="all" class="m-0">
				<WorkoutList workouts={workoutsState.workouts} />
			</Tabs.Content>
		</Tabs.Root>
	</Resizable.Pane>
	<Separator orientation="vertical" />
	<WorkoutSidePanel
		{workoutsState}
		data={data.form}
		workout={workoutsState.workouts?.find((item) => item.id === selectedWorkoutState.workout?.id)}
	/>
</Resizable.PaneGroup>
