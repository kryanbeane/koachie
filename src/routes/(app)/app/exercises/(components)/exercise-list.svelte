<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import ExerciseCard from './exercise-card.svelte';
	import { cn } from '$lib/utils.js';
	import type { CreateExercise, Exercise } from '@/schemas/exercises';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';

	export let ex: SuperValidated<CreateExercise>;
	export let exercises: Exercise[];
</script>

<ScrollArea class="h-full overflow-hidden">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each exercises as exercise}
			<ExerciseCard {ex} {exercise} createMode={false} editMode={false} />
		{/each}
	</div>
</ScrollArea>
