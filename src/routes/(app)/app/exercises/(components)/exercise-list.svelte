<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import ExerciseCard from './exercise-card.svelte';
	import type { Exercise, UpdateExercise } from '@/schemas/exercises';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { AllExerciseState } from '@/stores/all_exercise_state.svelte';

	export let exercisesState: AllExerciseState;
	export let ex: SuperValidated<UpdateExercise>;
</script>

<ScrollArea class="h-full overflow-hidden">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each exercisesState.exercises as exercise}
			<ExerciseCard {exercisesState} {ex} {exercise} createMode={false} editMode={false} />
		{/each}
	</div>
</ScrollArea>
