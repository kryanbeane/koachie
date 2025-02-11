<script lang="ts">
	import * as Table from "$lib/components/ui/table";
	import { InputWithVariant } from "$lib/components/ui/input";
	import TimeWidget from "./time_widget.svelte";
	import { type SetPerformance } from "@/schemas/workouts";

	let { set = $bindable() }: { set: SetPerformance } = $props();
</script>

{#snippet field(field: number | null, placeholder: string)}
	<Table.Cell class="text-center">
		{#if field === null}
			<InputWithVariant variant="set" sizing="sm" type="text" {placeholder} />
		{:else}
			<InputWithVariant variant="set" type="text" {placeholder} value={field} />
		{/if}
	</Table.Cell>
{/snippet}

<Table.Row>
	<Table.Cell class="text-center">{set.order + 1}</Table.Cell>
	{@render field(set.weight, "50 kg")}
	{@render field(set.reps, "6-10")}

	<Table.Cell class="text-center">
		<TimeWidget />
	</Table.Cell>
</Table.Row>
