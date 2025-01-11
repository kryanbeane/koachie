<script lang="ts">
	import * as Table from "$lib/components/ui/table";
	import type { CreateExerciseInstance, SetPerformance } from "@/schemas/exercises";
	import { InputWithVariant } from "$lib/components/ui/input";
	import TimeWidget from "./time_widget.svelte";

	let { instance }: { instance: CreateExerciseInstance } = $props();
	let setPerformances: SetPerformance[] = instance.performance;
</script>

{#snippet field(field: number | null, placeholder: string)}
	<Table.Cell class="flex-1">
		{#if field === null}
			<InputWithVariant variant="set" type="text" {placeholder} />
		{:else}
			<InputWithVariant variant="set" type="text" {placeholder} value={field} />
		{/if}
	</Table.Cell>
{/snippet}

{#each setPerformances as set}
	<Table.Row>
		<Table.Cell class="flex-1">{set.order + 1}</Table.Cell>
		{@render field(set.weight, "50 kg")}
		{@render field(set.reps, "6-10")}

		<Table.Cell class="flex-1">
			<TimeWidget />
		</Table.Cell>
	</Table.Row>
{/each}
