<script lang="ts">
	import Check from "lucide-svelte/icons/check";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { Option } from "@/data/enums";

	let {
		value = $bindable(),
		options,
		field,
		...restProps
	}: { options: Option[]; field: string; value: string } = $props();

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(options.find((opt) => opt.value === value)?.label);

	function closeAndFocusTrigger(option: Option) {
		value = option.value;
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open {...restProps}>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{selectedValue || `${field}`}
				<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input
				placeholder={`Search ${field.endsWith("y") ? field.slice(0, -1) + "ies" : field + "s"}...`}
			/>
			<Command.List>
				<Command.Empty>No {field} found.</Command.Empty>
				<Command.Group>
					{#each options as option}
						<Command.Item
							value={option.value}
							onSelect={() => {
								closeAndFocusTrigger(option);
							}}
						>
							<Check class={cn("mr-2 size-4", value !== option.value && "text-transparent")} />
							{option.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
