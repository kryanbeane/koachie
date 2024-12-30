<script lang="ts">
	import type { Exercise, ExerciseInstance } from '@/schemas/exercises';
	import * as Card from '$lib/components/ui/card/index.js';

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
</script>

<Card.Root class="bg-muted/50">
	<Card.Header>
		<Card.Title></Card.Title>
		<!-- <Card.Description>{exercise.note}</Card.Description> -->
	</Card.Header>
	<Card.Content class=""></Card.Content>
</Card.Root>
