<script lang="ts">
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { ChevronsUpDown, Check } from "lucide-svelte";

	let { exercises, exercise_id = $bindable("") } = $props();
	let open = $state(false);
	let value = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);

	$effect(() => {
		const exercise = exercises.find((f: { id: string }) => f.id === exercise_id);
		if (exercise) {
			value = exercise.name;
		}
	});

	let selectedValue = $derived(exercises.find((f: { name: string }) => f.name === value));

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef} class="w-full">
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="max-w-xs justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				<div class="flex w-full">
					<span class="flex-grow text-left">
						{selectedValue?.name || "Select a new exercise..."}
					</span>
					<ChevronsUpDown class="ml-auto opacity-50" />
				</div>
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[450px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search exercises..." />
			<Command.List>
				<Command.Empty>No exercises found.</Command.Empty>
				<Command.Group>
					{#each exercises as exercise}
						<Command.Item
							value={exercise.name}
							onSelect={() => {
								value = exercise.name;
								exercise_id = exercise.id;
								closeAndFocusTrigger();
							}}
						>
							<Check class={cn(value !== exercise.name && "text-transparent")} />
							{exercise.name}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
