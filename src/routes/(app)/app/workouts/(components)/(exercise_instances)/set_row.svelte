<script lang="ts">
	import * as Table from "$lib/components/ui/table";
	import { InputWithVariant } from "$lib/components/ui/input";
	import TimeWidget from "./time_widget.svelte";
	import { type SetPerformance } from "@/schemas/workouts";

	let { set = $bindable() }: { set: SetPerformance } = $props();
</script>

<Table.Row>
	<Table.Cell class="text-center">{set.order + 1}</Table.Cell>
	<Table.Cell class="text-center">
		<InputWithVariant variant="set" type="text" placeholder="50 kg" bind:value={set.weight} />
	</Table.Cell>
	<Table.Cell class="text-center">
		<InputWithVariant variant="set" type="text" placeholder="6-10" bind:value={set.reps} />
	</Table.Cell>

	<Table.Cell class="text-center">
		<TimeWidget />
	</Table.Cell>
</Table.Row>
