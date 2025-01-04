<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { ExerciseInstance } from '@/schemas/exercises';
	import ExerciseInstanceCard from './exercise_instance_card.svelte';

	let exerciseInstances: ExerciseInstance[] = [
		{
			id: '13ac9ece-597e-4580-90ea-71284a534d87',
			client_id: '5ce2de01-d885-497f-91b4-85eb6e431b95',
			exercise_id: '085b5a1a-5392-4453-9b2d-27ea7a7db052',
			workout_id: '13ac9ece-597e-4580-90ea-71284a534d82',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			performance: []
		},
		{
			id: '13ac9ece-597e-4580-90ea-71284a534d82',
			client_id: '5ce2de01-d885-497f-91b4-85eb6e431b92',
			exercise_id: '085b5a1a-5392-4453-9b2d-27ea7a7db052',
			workout_id: '13ac9ece-597e-4580-90ea-71284a534d82',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			performance: []
		}
	];
</script>

<Input type="text" placeholder="Enter text here..." class="mb-4" />

{#each exerciseInstances as exercise_instance}
	<ExerciseInstanceCard {exercise_instance} />
{/each}
