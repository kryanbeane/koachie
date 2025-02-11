<script lang="ts" module>
	import * as DropdownMenu from "@/components/ui/dropdown-menu";
	import { Separator } from "@/components/ui/separator";
	import * as Tooltip from "@/components/ui/tooltip/index";
	import { EllipsisVertical, Trash2 } from "lucide-svelte";
	import { toast } from "svelte-sonner";
	import { getAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import { Button } from "@/components/ui/button";
	import type { Exercise } from "@/schemas/exercises";
	import { onMount } from "svelte";
	import { getSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import CreateWorkoutForm from "@/forms/create_workout_form.svelte";
	import UpdateWorkoutForm from "@/forms/update_workout_form.svelte";
	import { page } from "$app/state";
</script>

<script lang="ts">
	let allWorkoutState = getAllWorkoutState();
	let selectedWorkoutState = getSelectedWorkoutState();

	let { data } = $props();

	let exercises: Exercise[] = $state([]);

	onMount(async () => {
		let resp = await fetch("/api/exercises", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		exercises = JSON.parse(await resp.text());
	});

	async function handleDeleteWorkout() {
		if (selectedWorkoutState.workout) {
			const response = await fetch(`/api/workouts`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: selectedWorkoutState.workout.id })
			});

			if (response.ok) {
				allWorkoutState.remove(selectedWorkoutState.workout);
				selectedWorkoutState.clear();

				toast.success(`Workout Deleted!`);
			}
		}
	}
</script>

<div class="mt-6 flex h-full flex-grow flex-col">
	<div class="mb-1 flex items-center p-2">
		{#if page.url.searchParams.get("mode") === "create"}
			<span class="text-lg font-semibold">Create Workout</span>
		{/if}
		{#if selectedWorkoutState.workout}
			<div class="ml-auto flex items-center gap-2">
				<Tooltip.Root>
					<Tooltip.Trigger id="move_to_trash_tooltip" disabled={!selectedWorkoutState.workout}>
						<Button size="sm" variant="ghost" onclick={handleDeleteWorkout}>
							<Trash2 class="size-4" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Delete Workout</Tooltip.Content>
				</Tooltip.Root>
			</div>
			<Separator orientation="vertical" class="mx-2 h-6" />
			<DropdownMenu.Root>
				<DropdownMenu.Trigger id="more_options_dropdown" disabled={!selectedWorkoutState.workout}>
					<Button size="sm" variant="ghost">
						<EllipsisVertical class="size-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Mark as unread</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</div>
	<Separator />
	{#if page.url.searchParams.get("mode") === "create"}
		<CreateWorkoutForm {data} {exercises} />
	{:else if selectedWorkoutState.workout}
		<UpdateWorkoutForm {data} />
	{:else}
		<div class="flex h-full items-center justify-center p-6">
			<span class="font-semibold">No Workouts Selected</span>
		</div>
	{/if}
</div>
