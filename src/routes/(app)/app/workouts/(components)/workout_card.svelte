<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import type { ExerciseInstance } from '@/schemas/exercises';
	import ExerciseInstanceCard from './exercise_instance_card.svelte';
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';

	export let workout;

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
		},
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

<div class="flex h-full flex-col">
	<Input type="text" placeholder={workout.name} class="m-4" />
	<div class="flex-grow overflow-y-auto">
		<ScrollArea orientation="vertical">
			{#each exerciseInstances as exercise_instance}
				<ExerciseInstanceCard {exercise_instance} />
			{/each}
		</ScrollArea>
	</div>
</div>
