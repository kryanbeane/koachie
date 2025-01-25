<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Check, ChevronsUpDown } from "lucide-svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { tick } from "svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { movementTypeEnum } from "$lib/data/enums.js";

	let { data, props } = $props();
	let allMovementTypes = Object.values(movementTypeEnum.Values);

	let openMovement = $state(false);
	let triggerRefMovement = $state<HTMLButtonElement>(null!);

	const selectedMovementType = $derived(
		allMovementTypes.find((f: string) => f === $data.movement_type)
	);
	function closeAndFocusTriggerMovement(movement_type: string) {
		if (movement_type === $data.movement_type) {
			$data.movement_type = "";
		} else {
			$data.movement_type = movement_type;
		}
	}
</script>

<Popover.Root bind:open={openMovement} {...props}>
	<Popover.Trigger bind:ref={triggerRefMovement}>
		{#snippet child({ props })}
			<Input type="hidden" name="movement_type" bind:value={$data.movement_type} />
			<Button
				variant="outline"
				class="flex w-full justify-between"
				{...props}
				role="combobox"
				aria-expanded={openMovement}
			>
				{selectedMovementType || "Select a Movement Type"}
				<ChevronsUpDown class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-full p-0">
		<Command.Root>
			<Command.Input placeholder="Search Movement types..." />
			<Command.List>
				<Command.Empty>No Movement types found.</Command.Empty>
				<Command.Group>
					{#each allMovementTypes as movementType}
						<Command.Item
							value={movementType}
							onSelect={() => {
								closeAndFocusTriggerMovement(movementType);
							}}
						>
							<Check class={cn($data.movement_type !== movementType && "text-transparent")} />
							{movementType}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
