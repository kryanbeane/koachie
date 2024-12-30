<script lang="ts">
	import type { Exercise, ExerciseInstance } from '@/schemas/exercises';
	import { tick } from 'svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ChevronsUpDown, Check } from 'lucide-svelte/icons';
	import { cn } from '$lib/utils.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import Input from '@/components/ui/input/input.svelte';

	let exerciseInstances: ExerciseInstance[] = [
		{
			id: '13ac9ece-597e-4580-90ea-71284a534d87',
			client_id: '5ce2de01-d885-497f-91b4-85eb6e431b95',
			exercise_id: '085b5a1a-5392-4453-9b2d-27ea7a7db052',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			performance: []
		}
	];

	let exercises: Exercise[] = [
		{
			id: '085b5a1a-5392-4453-9b2d-27ea7a7db052',
			name: 'Converging Chest Press',
			coach_id: '5ce2de01-d885-497f-91b4-85eb6e431b95',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			note: 'Use the prime plate-loaded machine',
			instructions: [
				'First adjust the seat height so that the handles are at chest height.',
				'Then sit on the seat and grasp the handles with a neutral grip.',
				'Push the handles together hard until your arms are fully extended.',
				'Slowly return to the starting position.'
			],
			muscle_groups: ['Chest', 'Triceps'],
			movement_type: 'Horizontal Push',
			video: 'https://www.youtube.com/watch?v=3VcKaXpzqRo'
		}
	];

	function getExerciseById(exerciseId: string): Exercise | undefined {
		return exercises.find((exercise) => exercise.id === exerciseId);
	}

	let open = $state(false);
	let value = $state('');
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(exercises.find((f) => f.name === value));

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Card.Root class="bg-muted/50 outline-double">
	<Card.Content>
		<Popover.Root bind:open>
			<Popover.Trigger bind:ref={triggerRef} class="w-full">
				{#snippet child({ props })}
					<!-- TODO: Change so that text is centered left and icon is centered right -->
					<Button
						variant="outline"
						class="max-w-xs justify-between"
						{...props}
						role="combobox"
						aria-expanded={open}
					>
						{selectedValue?.name || 'Select a new exercise...'}
						<ChevronsUpDown class="opacity-50" />
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="p-0">
				<Command.Root>
					<Command.Input placeholder="Search exercises..." />
					<Command.List>
						<Command.Empty>No exercises found.</Command.Empty>
						<Command.Group>
							{#each exercises as exercise}
								<Command.Item
									value={exercise.name}
									onSelect={() => {
										value = exercise.name;
										closeAndFocusTrigger();
									}}
								>
									<Check class={cn(value !== exercise.name && 'text-transparent')} />
									{exercise.name}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Set</Table.Head>
					<Table.Head>Weight (Kg)</Table.Head>
					<Table.Head>Reps</Table.Head>
					<Table.Head>Rest</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>1</Table.Cell>
					<Table.Cell>-</Table.Cell>
					<Table.Cell>5-7</Table.Cell>
					<Table.Cell>02:45</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>2</Table.Cell>
					<Table.Cell>-</Table.Cell>
					<Table.Cell>4-8</Table.Cell>
					<Table.Cell>03:00</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>

		<Input type="text" placeholder="Enter notes here..." class="max-w-xs" />
	</Card.Content>
</Card.Root>
