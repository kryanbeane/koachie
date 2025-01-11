<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	import * as Card from "$lib/components/ui/card/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";

	// New exercise data
	interface Exercise {
		name: string;
		note: string;
		movementType: string;
		muscleGroups: string[];
		instructions: string[];
	}

	let newExercise: Exercise = {
		name: "",
		note: "",
		movementType: "",
		muscleGroups: [],
		instructions: []
	};

	// Example data for dropdowns
	let allMuscleGroups = ["Chest", "Back", "Legs", "Arms", "Shoulders"];
	let allMovementTypes = ["Strength", "Cardio", "Flexibility"];

	function addMuscleGroup(group: string) {
		if (!newExercise.muscleGroups.includes(group)) {
			newExercise.muscleGroups = [...newExercise.muscleGroups, group];
		}
	}

	function removeMuscleGroup(group: string) {
		newExercise.muscleGroups = newExercise.muscleGroups.filter((g) => g !== group);
	}

	function addInstruction() {
		newExercise.instructions = [...newExercise.instructions, ""];
	}

	function removeInstruction(index: number) {
		newExercise.instructions = newExercise.instructions.filter((_, i) => i !== index);
	}

	function createExercise() {
		dispatch("create", newExercise);
		resetForm();
	}

	function cancelCreation() {
		dispatch("cancel");
		resetForm();
	}

	function resetForm() {
		newExercise = {
			name: "",
			note: "",
			movementType: "",
			muscleGroups: [],
			instructions: []
		};
	}
</script>

<div class="mt-24 flex justify-center">
	<Card.Card class="group relative w-[320px] overflow-hidden rounded-lg border shadow-md">
		<Card.CardHeader>
			<Card.CardTitle class="text-xl font-bold text-white">
				<input
					type="text"
					bind:value={newExercise.name}
					class="bg-transparent text-xl font-bold text-white"
					placeholder="Enter exercise name"
				/>
			</Card.CardTitle>
			<Card.CardDescription class="text-sm text-white">
				<input
					type="text"
					bind:value={newExercise.note}
					class="bg-transparent text-sm text-white"
					placeholder="Enter exercise name"
				/>
			</Card.CardDescription>
		</Card.CardHeader>
		<Card.CardContent class="space-y-4 p-4">
			<!-- Movement Type -->
			<!-- <div>
					<p class="text-sm text-white border border-white rounded-md px-3 py-1 w-fit">
						{exercise.movement_type}
					</p>
				</div> -->

			<!-- Muscle Groups (Scrollable List) -->
			<!-- <div>
					<div class="flex gap-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
						{#each exercise.muscle_groups as group (group)}
							<span
								class="px-3 py-1 text-sm border border-gray-300 rounded-full whitespace-nowrap bg-gray-100 text-black"
							>
								{group}
							</span>
						{/each}
					</div>
				</div> -->

			<!-- Instructions -->

			<!-- Dropdown for Movement Type -->
			<div class="mb-4">
				<label for="movement-type" class="block text-sm font-semibold text-gray-700"
					>Movement Type</label
				>
				<select
					id="movement-type"
					bind:value={newExercise.movementType}
					class="w-fit rounded-md border border-white bg-transparent px-3 py-1 text-sm text-white"
				>
					<option value="" disabled>Select movement type</option>
					{#each allMovementTypes as type}
						<option value={type}>{type}</option>
					{/each}
				</select>
			</div>

			<!-- Addable Muscle Groups -->
			<div class="mb-4">
				<label class="block text-sm font-semibold text-gray-700">Targeted Muscle Groups</label>
				<div
					class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
				>
					{#each newExercise.muscleGroups as group}
						<!-- <span
              class="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded-full bg-gray-100 text-gray-800 whitespace-nowrap"
            > -->
						<Badge>
							{group}

							<button
								type="button"
								onclick={() => removeMuscleGroup(group)}
								class="text-red-500 hover:text-red-700"
							>
								&times;
							</button>
						</Badge>
						<!-- </span> -->
					{/each}
				</div>
				<select
					onchange={(event) => {
						const target = event.target as HTMLSelectElement | null;
						if (target) {
							addMuscleGroup(target.value);
						}
					}}
					class="w-fit rounded-md border border-white bg-transparent px-3 py-1 text-sm text-white"
				>
					<option value="" disabled>Select a muscle group</option>
					{#each allMuscleGroups as group}
						<option value={group}>{group}</option>
					{/each}
				</select>
			</div>

			<!-- <div>
					<h3 class="text-md font-semibold text-white">Instructions</h3>
					<div class="border border-gray-300 rounded-md p-3 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
						<ul class="space-y-2">
							{#each exercise.instructions as instruction, index}
								<li class="text-sm text-white border border-gray-300 rounded-md p-2">
									{instruction}
								</li>
							{/each}
						</ul>
					</div>
				</div> -->

			<!-- Addable Instructions -->
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="block text-sm font-semibold text-gray-700">Instructions</label>
			<div
				class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 max-h-32 overflow-y-auto rounded-md border border-gray-300 p-3"
			>
				<button
					type="button"
					onclick={addInstruction}
					class="mt-2 rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
				>
					+ Add Instruction
				</button>
				<ul class="space-y-2">
					{#each newExercise.instructions as instruction, index}
						<li class="flex items-center">
							<input
								type="text"
								bind:value={newExercise.instructions[index]}
								class="flex-grow rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
								placeholder="Enter instruction"
							/>
							<button
								type="button"
								onclick={() => removeInstruction(index)}
								class="ml-2 text-red-500 hover:text-red-700"
							>
								&times;
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</Card.CardContent>
		<Card.CardFooter>
			<!-- Footer Buttons -->
			<div class="mt-4 flex justify-between">
				<button
					type="button"
					onclick={createExercise}
					class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
				>
					Create
				</button>
				<button
					type="button"
					onclick={cancelCreation}
					class="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
				>
					Cancel
				</button>
			</div>
		</Card.CardFooter>
	</Card.Card>
</div>
