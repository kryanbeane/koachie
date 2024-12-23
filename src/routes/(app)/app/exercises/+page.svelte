<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '@/components/ui/button';
	import { type PageData } from './$types';

	export let data: PageData;

	let exercises = data.exercises;
</script>

{#if exercises.length > 0}
	{#each exercises as exercise}
		<div class="mt-24">
			<Card.Card class="w-[350px]">
				<Card.CardHeader>
					<Card.CardTitle>{exercise.name}</Card.CardTitle>
					<Card.CardDescription>{exercise.note}</Card.CardDescription>
				</Card.CardHeader>
				<Card.CardContent></Card.CardContent>
				<Card.CardFooter class="flex justify-between">
					<Button variant="outline">Cancel</Button>
					<Button>Deploy</Button>
				</Card.CardFooter>
			</Card.Card>
		</div>
	{/each}
{:else}
	<p>No exercises found</p>
{/if}
