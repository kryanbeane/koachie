<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import ExerciseCard from './exercise-card.svelte';
	import type { Exercise } from '@/schemas/exercises';

	export let exercises: Exercise[];
</script>

<ScrollArea class="h-full overflow-hidden">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each exercises as exercise}
			<ExerciseCard {exercise} createMode={false} editMode={false} />
		{/each}
	</div>
</ScrollArea>
