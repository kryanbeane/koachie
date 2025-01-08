<script lang="ts">
	import type { Exercise } from '@/schemas/exercises';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import SelectExercise from './select_exercise.svelte';
	import SetRow from './set_row.svelte';
	import NoOutlineInput from '../(other)/no_outline_input.svelte';

	let { exercise_instance: ExerciseInstance } = $props();

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
</script>

<Card.Root class="m-4 w-96 bg-muted/50 outline-double outline-white/25">
	<Card.Content>
		<SelectExercise {exercises} />

		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="flex-1">Set</Table.Head>
					<Table.Head class="flex-1">Weight (kg)</Table.Head>
					<Table.Head class="flex-1">Reps</Table.Head>
					<Table.Head class="flex-1">RIR</Table.Head>
					<Table.Head class="flex-1">Rest</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<SetRow />
			</Table.Body>
		</Table.Root>

		<NoOutlineInput type="text" placeholder="Enter notes here..." class="mt-2 w-full" />
	</Card.Content>
</Card.Root>
