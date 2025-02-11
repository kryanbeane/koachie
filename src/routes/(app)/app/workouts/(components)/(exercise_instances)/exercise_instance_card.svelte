<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import SetRow from "./set_row.svelte";
	import NoOutlineInput from "../(other)/no_outline_input.svelte";
	import Button from "@/components/ui/button/button.svelte";
	import { ListPlus } from "lucide-svelte";
	import type { Exercise } from "@/schemas/exercises";
	import SelectExercise from "./select_exercise.svelte";
	import type { ExerciseInstance } from "@/schemas/workouts";

	let { instance, exercises }: { instance: ExerciseInstance; exercises: Exercise[] } = $props();

	// function getExerciseById(exerciseId: string): Exercise | undefined {
	// 	return exercises.find((exercise) => exercise.id === exerciseId);
	// }
</script>

<Card.Root class="mb-4 mt-2 bg-muted/50 ">
	<Card.Content>
		<SelectExercise {exercises} />

		<Table.Root>
			<Table.Header>
				<Table.Row
					>x§x§§§x
					<!-- TODO: Construct this as variables including custom ones -->
					<Table.Head class="flex-1 text-center">Set</Table.Head>
					<Table.Head class="flex-1 text-center">Weight (kg)</Table.Head>
					<Table.Head class="flex-1 text-center">Reps</Table.Head>
					<Table.Head class="flex-1 text-center">Rest</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each instance.sets as set}
					<SetRow {set} />
				{/each}
			</Table.Body>
		</Table.Root>

		<Button
			class="ml-auto"
			variant="secondary"
			size="sm"
			type="button"
			onclick={() => {
				instance.sets.push({
					order: instance.sets.length,
					weight: null,
					reps: null,
					restTime: "03:00"
				});
			}}
		>
			<ListPlus />
		</Button>

		<NoOutlineInput type="text" placeholder="Enter notes here..." class="mt-2 w-full" />
	</Card.Content>
</Card.Root>
