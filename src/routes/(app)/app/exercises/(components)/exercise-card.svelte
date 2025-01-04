<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';

	import { cn } from '$lib/utils.js';

	export let exercise: {
		id: number;
		name: string;
		movement_type: string;
		note: string;
		muscle_groups: string[];
		instructions: string[];
	};

	export let editMode = false;

	// Handle main click on the card
	function handleExerciseClick(exercise: { id: number }) {
		console.log('Exercise clicked:', exercise.id);
	}

	// Handle edit button click
	function handleEdit(event: Event, exercise: { id: number }) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log('Edit clicked for:', exercise.id);
		editMode = true;
	}

	// Handle delete button click
	function handleDelete(event: Event, exercise: { id: number }) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log('Delete clicked for:', exercise.id);
	}

	// Handle save button click
	function handleSave(event: Event, exercise: { id: number }) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log('Save clicked for:', exercise.id);
		editMode = false;
	}

	// Handle cancel button click
	function handleCancel(event: Event, exercise: { id: number }) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log('Cancel clicked for:', exercise.id);
		editMode = false;
	}

	function addMuscleGroup(group: string) {
		if (!exercise.muscle_groups.includes(group)) {
			exercise.muscle_groups = [...exercise.muscle_groups, group];
		}
	}

	function removeMuscleGroup(group: string) {
		exercise.muscle_groups = exercise.muscle_groups.filter((g) => g !== group);
	}

	function addInstruction() {
		exercise.instructions = [...exercise.instructions, ''];
	}

	function removeInstruction(index: number) {
		exercise.instructions = exercise.instructions.filter((_, i) => i !== index);
	}

	let allMuscleGroups = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders'];
	let allMovementTypes = ['Strength', 'Cardio', 'Flexibility'];
</script>

<!-- Card Wrapper -->
<div
	class={cn(
		'group relative flex items-start gap-4 rounded-lg border p-3 text-left text-sm',
		'bg-muted transition-all duration-300 ease-in-out',
		!editMode && 'hover:border-accent hover:bg-accent hover:shadow-lg hover:shadow-accent/70',

		editMode && 'border-gray-500 bg-gray-800'
	)}
	tabindex="0"
	role="button"
	on:click={() => handleExerciseClick(exercise)}
	on:keydown={(e) => e.key === 'Enter' && handleExerciseClick(exercise)}
>
	{#if editMode}
		<!-- Sidebar (Only in Edit Mode) -->
		<div class="absolute right-0 top-0 h-full w-2 rounded-l-md bg-accent"></div>

		<!-- Edit Mode Buttons: Save & Cancel -->
		<div
			class="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-0 flex-col gap-2 opacity-100"
		>
			<button
				class="mr-2 rounded-md bg-gray-200 p-2 transition-all hover:bg-gray-300"
				aria-label="Save"
				on:click={(e) => handleSave(e, exercise)}
			>
				<svg
					class="h-4 w-4 text-gray-800"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</button>
			<button
				class="mr-2 rounded-md bg-red-200 p-2 transition-all hover:bg-red-300"
				aria-label="Cancel"
				on:click={(e) => handleCancel(e, exercise)}
			>
				<svg
					class="h-4 w-4 text-gray-800"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	{:else}
		<!-- Default Mode: Edit & Delete Buttons -->
		<div
			class="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
		>
			<button
				class="mr-2 rounded-md bg-gray-200 p-2 transition-all hover:bg-gray-300"
				aria-label="Edit"
				on:click={(e) => handleEdit(e, exercise)}
			>
				<svg
					class="h-4 w-4 text-gray-800"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
					/>
				</svg>
			</button>
			<button
				class="mr-2 rounded-md bg-red-200 p-2 transition-all hover:bg-red-300"
				aria-label="Delete"
				on:click={(e) => handleDelete(e, exercise)}
			>
				<svg
					class="h-4 w-4 text-gray-800"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
					/>
				</svg>
			</button>
		</div>
	{/if}

	<!--Main Content -->
	<div class="flex w-full justify-between">
		<!-- Left Section (Details) -->
		<div class="flex w-[55%] flex-col gap-1">
			<div class="flex items-center">
				{#if editMode}
					<input
						type="text"
						class="w-full bg-transparent text-xl font-semibold text-white"
						value={exercise.name}
					/>
				{:else}
					<div class="font-semibold">{exercise.name}</div>
				{/if}
			</div>
			{#if editMode}
				<!-- <input
                            type="text"
                            class="w-full bg-transparent text-white font-semibold text-xs"
                            value={exercise.movement_type}
                        /> -->
				<select
					id="movement-type"
					bind:value={exercise.movement_type}
					class="w-fit rounded-md border border-white bg-transparent px-3 py-1 text-sm text-white"
				>
					<option value="" disabled>Select movement type</option>
					{#each allMovementTypes as type}
						<option value={type}>{type}</option>
					{/each}
				</select>
			{:else}
				<div class="text-xs font-medium">{exercise.movement_type}</div>
			{/if}
			<div class="line-clamp-2 text-xs text-muted-foreground">
				{#if editMode}
					<input
						type="text"
						class="w-full bg-transparent text-xs font-semibold text-white"
						value={exercise.note}
					/>
				{:else}
					{exercise.note.substring(0, 300)}
				{/if}
			</div>
			{#if editMode}
				<div
					class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
				>
					{#each exercise.muscle_groups as group}
						<!-- <span
                        class="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded-full bg-gray-100 text-gray-800 whitespace-nowrap"
                        > -->
						<Badge>
							{group}

							<button
								type="button"
								on:click={() => removeMuscleGroup(group)}
								class="text-red-500 hover:text-red-700"
							>
								&times;
							</button>
						</Badge>
						<!-- </span> -->
					{/each}
				</div>
				<select
					on:change={(event) => {
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
			{:else if exercise.muscle_groups.length}
				<div
					class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
				>
					{#each exercise.muscle_groups as group (group)}
						<span class=" whitespace-nowrap">
							<Badge>{group}</Badge>
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Instructions Section -->
		<div
			class={cn(
				'ml-1 w-[40%] transform transition-all duration-300 ease-in-out',
				!editMode && 'group-hover:-translate-x-10',
				editMode && '-translate-x-10'
			)}
		>
			<div
				class={cn(
					'scrollbar-thin scrollbar-thumb-gray-200 overflow-y-auto rounded-md border-2 border-gray-500 p-1',
					editMode && 'max-h-36',
					!editMode && 'max-h-24'
				)}
			>
				<h3 class="text-md mb-1 text-center font-semibold text-white">Instructions</h3>
				{#if editMode}
					<ul class="space-y-2">
						{#each exercise.instructions as instruction, index}
							<li class="flex items-center">
								<input
									type="text"
									class="w-full bg-transparent text-xs font-semibold text-white"
									bind:value={exercise.instructions[index]}
									placeholder="Add instruction"
								/>
								<button
									type="button"
									on:click={() => removeInstruction(index)}
									class="ml-2 text-red-500 hover:text-red-700"
								>
									&times;
								</button>
							</li>
						{/each}

						<li class="rounded-md border border-gray-500 p-1 text-center text-sm text-white">
							<button type="button" on:click={addInstruction}> + Add Instruction </button>
						</li>
					</ul>
				{:else}
					<ul class="space-y-2">
						{#each exercise.instructions as instruction}
							<li class="rounded-md border border-gray-500 p-1 text-center text-sm text-white">
								{instruction}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
</div>
