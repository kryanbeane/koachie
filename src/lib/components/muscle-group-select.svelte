<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Check, ChevronsUpDown } from "lucide-svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { tick } from "svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { muscleGroupEnum } from "$lib/data/enums.js";
	import { filteredMuscleGroups } from "@/stores/filtered_muscle_groups.svelte";

	let { data, props } = $props();

	console.log("data", $data);

	console.log("filteredMuscleGroups", filteredMuscleGroups);

	function addMuscleGroup(group: string) {
		console.log("Before adding group:", $data.muscle_groups);
		const muscleGroups = $data.muscle_groups || [];
		if (!muscleGroups.includes(group)) {
			$data = {
				...$data,
				muscle_groups: [...muscleGroups, group]
			};
		} else if (muscleGroups.includes(group)) {
			console.log("Muscle group already exists");
			removeMuscleGroup(group);
		}
	}

	function removeMuscleGroup(group: string) {
		$data = {
			...$data,
			muscle_groups: $data.muscle_groups.filter((g: string) => g !== group)
		};
	}

	let allMuscleGroups = Object.values(muscleGroupEnum.Values);

	let openMuscle = $state(false);
	let muscleValue = $state("");
	let triggerRefMuscle = $state<HTMLButtonElement>(null!);

	const selectedMuscleGroup = $derived(allMuscleGroups.find((f: string) => f === muscleValue));
</script>

<Popover.Root bind:open={openMuscle} {...props}>
	<Popover.Trigger bind:ref={triggerRefMuscle}>
		{#snippet child({ props })}
			<Input type="hidden" name="muscle_groups" bind:value={$data.muscle_groups} />
			<Button
				variant="outline"
				class="w-full justify-between"
				{...props}
				role="combobox"
				aria-expanded={openMuscle}
			>
				{selectedMuscleGroup || "Select a Muscle Group..."}
				<ChevronsUpDown class="align-right opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-full p-0">
		<Command.Root>
			<Command.Input placeholder="Search Muscle groups" />
			<Command.List>
				<Command.Empty>No muscle groups found.</Command.Empty>
				<Command.Group>
					{#each allMuscleGroups as muscleGroup}
						<Command.Item
							value={muscleGroup}
							onSelect={() => {
								muscleValue = muscleGroup;
								addMuscleGroup(muscleValue);
							}}
						>
							{#if $data.muscle_groups}
								<Check
									class={cn(!$data.muscle_groups.includes(muscleGroup) && "text-transparent")}
								/>
							{/if}
							{muscleGroup}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
