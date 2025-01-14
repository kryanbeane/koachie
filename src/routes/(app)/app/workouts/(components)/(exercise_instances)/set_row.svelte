<script lang="ts">
	import * as Table from "$lib/components/ui/table";
	import type { SetPerformance } from "@/schemas/exercises";
	import { InputWithVariant } from "$lib/components/ui/input";
	import TimeWidget from "./time_widget.svelte";

	let { setPerformance }: { setPerformance: SetPerformance[] } = $props();
</script>

{#snippet field(field: number | null, placeholder: string)}
	<Table.Cell class="flex-1">
		{#if field === null}
			<InputWithVariant variant="set" sizing="sm" type="text" {placeholder} />
		{:else}
			<InputWithVariant variant="set" type="text" {placeholder} value={field} />
		{/if}
	</Table.Cell>
{/snippet}

{#each setPerformance as set}
	<Table.Row>
		<Table.Cell class="flex-1">{set.order + 1}</Table.Cell>
		{@render field(set.weight, "50 kg")}
		{@render field(set.reps, "6-10")}

		<Table.Cell class="flex-1">
			<TimeWidget />
		</Table.Cell>
	</Table.Row>
{/each}
