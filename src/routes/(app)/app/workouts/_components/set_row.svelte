<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import TimeWidget from './time_widget.svelte';
</script>

<Table.Row>
	<Table.Cell class="flex-1">1</Table.Cell>
	<Table.Cell class="flex-1">
		<input
			type="text"
			id="counter-input"
			data-input-counter
			class="max-w-[1.75rem] flex-shrink-0 border-0 bg-transparent text-center text-sm font-normal text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
			placeholder=""
			value="12"
			required
		/>
	</Table.Cell>
	<Table.Cell class="flex-1">
		<input
			type="text"
			id="counter-input"
			data-input-counter
			class="max-w-[1.75rem] flex-shrink-0 border-0 bg-transparent text-center text-sm font-normal text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
			placeholder=""
			value="5-8"
			required
		/>
	</Table.Cell>
	<Table.Cell class="flex-1">
		<input
			type="text"
			id="counter-input"
			data-input-counter
			class="max-w-[1.75rem] flex-shrink-0 border-0 bg-transparent text-center text-sm font-normal text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
			placeholder=""
			value="1"
			required
		/>
	</Table.Cell>
	<Table.Cell class="flex-1">
		<TimeWidget />
	</Table.Cell>
</Table.Row>
