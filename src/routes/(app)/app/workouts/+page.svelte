<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { ExerciseInstance } from '@/schemas/exercises';
	import ExerciseInstanceCard from './_components/exercise_instance_card.svelte';

	let exerciseInstances: ExerciseInstance[] = [
		{
			id: '13ac9ece-597e-4580-90ea-71284a534d87',
			client_id: '5ce2de01-d885-497f-91b4-85eb6e431b95',
			exercise_id: '085b5a1a-5392-4453-9b2d-27ea7a7db052',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			performance: []
		},
		{
			id: '13ac9ece-597e-4580-90ea-71284a534d82',
			client_id: '5ce2de01-d885-497f-91b4-85eb6e431b92',
			exercise_id: '085b5a1a-5392-4453-9b2d-27ea7a7db052',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			performance: []
		}
	];
</script>

<Card.Root class="flex h-full w-full flex-col">
	<Card.Content class="flex flex-grow flex-col p-4">
		<Input type="text" placeholder="Enter text here..." class="mb-4" />

		{#each exerciseInstances as exercise_instance}
			<ExerciseInstanceCard {exercise_instance} />
		{/each}

		<div class="flex justify-end space-x-2">
			<Button variant="outline">Cancel</Button>
			<Button variant="default">Submit</Button>
		</div>
	</Card.Content>
</Card.Root>
