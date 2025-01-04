<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import ExerciseCard from './exercise-card.svelte';
	import { cn } from '$lib/utils.js';

	export let exercises;
</script>

<ScrollArea class="h-full overflow-hidden">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each exercises as exercise}
			<ExerciseCard {exercise} />
		{/each}
	</div>
</ScrollArea>
