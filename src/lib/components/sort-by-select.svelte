<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Check, ChevronsUpDown } from "lucide-svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { tick } from "svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";

	let { data, props } = $props();
	let sort_by_methods = ["name", "created_at", "updated_at"];

	let openSort = $state(false);
	let triggerRefSort = $state<HTMLButtonElement>(null!);

	function closeAndFocusTriggerSort() {
		openSort = false;
		tick().then(() => {
			triggerRefSort.focus();
		});
	}

	const selectedSortMethod = $derived(sort_by_methods.find((f: string) => f === $data.sort_by));
</script>

<Popover.Root bind:open={openSort} {...props}>
	<Popover.Trigger bind:ref={triggerRefSort}>
		{#snippet child({ props })}
			<Input type="hidden" name="movement_type" bind:value={$data.sort_by} />
			<Button
				variant="outline"
				class="flex w-full justify-between"
				{...props}
				role="combobox"
				aria-expanded={openSort}
			>
				{selectedSortMethod || "Sort by"}
				<ChevronsUpDown class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-full p-0">
		<Command.Root>
			<Command.List>
				<Command.Empty>No Movement types found.</Command.Empty>
				<Command.Group>
					{#each sort_by_methods as sortMedthod}
						<Command.Item
							value={sortMedthod}
							onSelect={() => {
								$data.sort_by = sortMedthod;
								closeAndFocusTriggerSort();
							}}
						>
							<Check class={cn($data.sort_by !== sortMedthod && "text-transparent")} />
							{sortMedthod}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
