<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { type PageData } from './$types';

	export let data: PageData;

	let exercises = data.exercises;
</script>

{#if exercises.length > 0}
	{#each exercises as exercise}
		<div class="mt-24">
			<Card.Root>
				<Card.Header>
					<Card.Title>{exercise.name}</Card.Title>
					<Card.Description>{exercise.note}</Card.Description>
				</Card.Header>
				<Card.Content></Card.Content>
			</Card.Root>
		</div>
	{/each}
{:else}
	<p>No exercises found</p>
{/if}
