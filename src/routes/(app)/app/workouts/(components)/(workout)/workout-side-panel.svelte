<script lang="ts">
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { Separator } from '@/components/ui/separator';
	import * as Tooltip from '@/components/ui/tooltip/index';
	import {
		createWorkoutFormSchema,
		type CreateWorkoutFormSchema,
		type Workout
	} from '@/schemas/workouts';
	import { EllipsisVertical, Trash2 } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import {
		type SuperValidated,
		type Infer,
		superForm,
		type FormResult
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import NameInput from '@/components/ui/input/name-input.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';
	import { toast } from 'svelte-sonner';
	import { AllWorkoutState } from '@/stores/all_workout_state.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import type { ActionData } from '../../$types';

	export let workout: Workout | null = null;
	export let data: SuperValidated<Infer<CreateWorkoutFormSchema>>;
	export let workoutsState: AllWorkoutState;

	const form = superForm(data, {
		validators: zodClient(createWorkoutFormSchema),

		onUpdate({ form, result }) {
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.workout) {
				workoutsState.add(action.workout[0]);
				toast.success(`Workout ${action.workout[0].name} Updated!`);
			}
		}
	});

	async function handleDeleteWorkout() {
		if (workout) {
			const response = await fetch(`/api/workouts`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: workout.id })
			});

			if (response.ok) {
				workoutsState.remove(workout);
				toast.success(`Workout ${workout.name} Deleted!`);
			}
		}
	}

	const { form: formData, enhance } = form;
</script>

<div class="flex h-full min-w-[26rem] flex-col">
	<div class="mb-1 flex items-center p-2">
		<div class="ml-auto flex items-center gap-2">
			<Tooltip.Root>
				<Tooltip.Trigger id="move_to_trash_tooltip" disabled={!workout}>
					<Button size="sm" variant="ghost" onclick={handleDeleteWorkout}>
						<Trash2 class="size-4" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Delete Workout</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<Separator orientation="vertical" class="mx-2 h-6" />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger id="more_options_dropdown" disabled={!workout}>
				<Button size="sm" variant="ghost">
					<EllipsisVertical class="size-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item>Mark as unread</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<Separator />

	{#if workout}
		<div class="m-4">
			<NameInput placeholder={workout.name} value={workout.name} />
			<Textarea placeholder="Workout description..." value={workout.description} class="mt-2" />

			<ScrollArea orientation="vertical">
				<!-- {#each exerciseInstances as exercise_instance}
					<ExerciseInstanceCard {exercise_instance} />
				{/each} -->
			</ScrollArea>
		</div>
	{:else}
		<!-- <div class="p-8 text-center text-muted-foreground">No workout selected</div> -->
		<form method="POST" use:enhance class="m-4 h-full">
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<NameInput placeholder="Workout Name..." {...props} bind:value={$formData.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control>
					{#snippet children({ props })}
						<Textarea
							placeholder="Workout description..."
							{...props}
							bind:value={$formData.description}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</form>

		<!-- <Button variant="secondary" size="sm" class="mx-2">
			<PlusSquareIcon size="24" />
			Create
		</Button> -->
	{/if}
</div>
