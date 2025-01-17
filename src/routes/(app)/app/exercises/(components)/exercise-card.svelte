<script lang="ts">
	import { cn } from "$lib/utils.js";

	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { tick } from "svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Check from "lucide-svelte/icons/check";
	import { createExerciseSchema, type Exercise } from "@/schemas/exercises";
	import { updateExerciseSchema } from "@/schemas/exercises";
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { superForm, type FormResult, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { muscleGroupEnum, movementTypeEnum } from "$lib/data/enums.js";
	import { toast } from "svelte-sonner";
	import type { ActionData } from "../$types";
	import type { AllExerciseState } from "@/stores/all_exercise_state.svelte";

	let {
		createMode = $bindable(true),
		editMode,
		ex,
		exercise,
		exercisesState
	}: {
		ex: SuperValidated<Exercise>;
		editMode: boolean;
		createMode: boolean;
		exercise: Exercise | null;
		exercisesState: AllExerciseState;
	} = $props();
	const createForm = superForm(ex, {
		id: "create-exercise-form",
		validators: zodClient(createExerciseSchema),
		onUpdate({ form, result }) {
			createMode = false;
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.exercise) {
				exercisesState.add(action.exercise);
				toast.success(`Exercise ${action.exercise.name} created successfully.`);
			}
		}
	});
	const { form: createFormData, enhance: createEnhance } = createForm;

	const updateForm = superForm(exercise!!, {
		id: "update-exercise-form",
		validators: zodClient(updateExerciseSchema),
		onUpdate({ form, result }) {
			editMode = false;
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.exercise) {
				exercisesState.update(action.exercise);
				toast.success(`Exercise ${action.exercise.name} updated successfully.`);
			}
		}
	});

	const { form: updateFormData, enhance: updateEnhance } = updateForm;

	const deleteForm = superForm(exercise!!, {
		id: "delete-exercise-form",
		validators: zodClient(updateExerciseSchema),
		onUpdate({ form, result }) {
			$deleteFormData = { ...exercise!! };
			const action = result.data as FormResult<ActionData>;
			if (form.valid && action.id) {
				exercisesState.remove(action.id);
				toast.success(`Exercise deleted successfully.`);
			}
		}
	});

	const { form: deleteFormData, enhance: deleteEnhance } = deleteForm;

	// Handle edit Button click
	function handleEdit(event: Event, exercise: Exercise) {
		console.log("Edit clicked for:", exercise.id);
		$updateFormData = { ...exercise };
		editMode = true;
	}

	// Handle cancel Button click
	function handleCancel(event: Event, exercise: Exercise) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log("Cancel clicked for:", exercise.id);
		editMode = false;
	}

	function addMuscleGroup(group: string) {
		if (createMode) {
			if (!$createFormData.muscle_groups.includes(group)) {
				$createFormData = {
					...$createFormData,
					muscle_groups: [...$createFormData.muscle_groups, group]
				};
			}
		} else {
			if (!$updateFormData.muscle_groups.includes(group)) {
				$updateFormData = {
					...$updateFormData,
					muscle_groups: [...$updateFormData.muscle_groups, group]
				};
			}
		}
	}

	function removeMuscleGroup(group: string) {
		if (createMode) {
			$createFormData = {
				...$createFormData,
				muscle_groups: $createFormData.muscle_groups.filter((g: string) => g !== group)
			};
		} else {
			$updateFormData = {
				...$updateFormData,
				muscle_groups: $updateFormData.muscle_groups.filter((g: string) => g !== group)
			};
		}
	}

	function addInstruction() {
		if (createMode) {
			$createFormData = { ...$createFormData, instructions: [...$createFormData.instructions, ""] };
			console.log("INSTRUCTIONS", $createFormData.instructions);
		} else {
			$updateFormData = { ...$updateFormData, instructions: [...$updateFormData.instructions, ""] };
		}
	}

	function removeInstruction(index: number) {
		if (createMode) {
			$createFormData = {
				...$createFormData,
				instructions: $createFormData.instructions.filter((_: any, i: number) => i !== index)
			};
		} else {
			$updateFormData = {
				...$updateFormData,
				instructions: $updateFormData.instructions.filter((_: any, i: number) => i !== index)
			};
		}
	}

	function handleCancelCreate(event: Event, exercise: Exercise) {
		event.stopPropagation(); // Prevent triggering the parent card click
		console.log("Cancel clicked for:", exercise.id);
		createMode = false;
	}

	let allMuscleGroups = Object.values(muscleGroupEnum.Values);
	let allMovementTypes = Object.values(movementTypeEnum.Values);

	let openMovement = $state(false);
	let movementValue = $state("");
	let triggerRefMovement = $state<HTMLButtonElement>(null!);

	let openMuscle = $state(false);
	let muscleValue = $state("");
	let triggerRefMuscle = $state<HTMLButtonElement>(null!);

	function closeAndFocusTriggerMovement() {
		openMovement = false;
		tick().then(() => {
			triggerRefMovement.focus();
		});
	}

	const selectedMovementTypeUpdate = $derived(
		allMovementTypes.find((f: string) => f === $updateFormData.movement_type)
	);

	const selectedMovementTypeCreate = $derived(
		allMovementTypes.find((f: string) => f === $createFormData.movement_type)
	);

	const selectedMuscleGroup = $derived(allMuscleGroups.find((f: string) => f === muscleValue));
</script>

{#if !editMode && !createMode}
	<div
		class={cn(
			"group relative flex h-fit items-start gap-4 rounded-lg border p-3 text-left text-sm",
			"bg-muted transition-all duration-300 ease-in-out",
			!editMode && "hover:border-accent hover:bg-accent hover:shadow-lg hover:shadow-accent/70",
			editMode && "border-gray-500 bg-gray-800"
		)}
	>
		<!--Main Content -->
		<div class="flex w-full items-start">
			<div class="flex w-[55%] flex-col gap-1">
				<div class="flex items-center">
					<div class="font-semibold">{exercise!!.name}</div>
				</div>
				<div class="mt-1 line-clamp-2 text-xs text-muted-foreground">
					{exercise!!.note.substring(0, 300)}
				</div>
				<div class="text-xs font-medium">{exercise!!.movement_type}</div>

				<div
					class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
				>
					{#each exercise!!.muscle_groups as group (group)}
						<span class=" whitespace-nowrap">
							<Badge>{group}</Badge>
						</span>
					{/each}
				</div>
			</div>

			<!-- Instructions Section -->
			{#if exercise!!.instructions.length > 0}
				<div
					class={cn(
						"ml-10 w-[40%] transform transition-all duration-300 ease-in-out",
						"group-hover:-translate-x-10"
					)}
				>
					<div
						class={cn(
							"scrollbar-thin scrollbar-thumb-gray-200 max-h-24 overflow-y-auto rounded-md border-2 border-gray-500 p-1"
						)}
					>
						<h3 class="text-md mb-1 text-center font-semibold text-white">Instructions</h3>

						<ul class="space-y-2">
							{#each exercise!!.instructions as instruction}
								<li class="rounded-md border border-gray-500 p-1 text-center text-sm text-white">
									{instruction}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}
		</div>

		<div
			class="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
		>
			<Button
				class="mr-2 rounded-md bg-gray-200 p-3 transition-all hover:bg-gray-300"
				aria-label="Edit"
				onclick={(e) => handleEdit(e, exercise!!)}
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
			</Button>
			<form method="POST" action="?/deleteExercise" use:deleteEnhance>
				<Form.Field form={deleteForm} name="deleteExercise">
					<Form.Control>
						{#snippet children({ props })}
							<Input type="hidden" name="id" bind:value={$deleteFormData.id} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button
					class="mr-2 rounded-md bg-red-200 p-3 transition-all hover:bg-red-300"
					aria-label="Delete"
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
				</Form.Button>
			</form>
		</div>
	</div>
{:else if editMode && !createMode}
	<div
		class={cn(
			"group relative flex items-start gap-4 rounded-lg border p-3 text-left text-sm",
			"bg-muted transition-all duration-300 ease-in-out",
			"border-gray-500 bg-gray-800"
		)}
	>
		<form method="POST" action="?/updateExercise" use:updateEnhance class="flex w-full gap-6">
			<!-- Left Column -->
			<div class="w-1/2 space-y-3">
				<Form.Field form={updateForm} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Input type="hidden" name="id" bind:value={$updateFormData.id} />
							<Input
								{...props}
								class="w-full bg-transparent text-xl font-semibold text-white"
								bind:value={$updateFormData.name}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field form={updateForm} name="note">
					<Form.Control>
						{#snippet children({ props })}
							<Input
								{...props}
								class="w-full bg-transparent text-xs font-semibold text-white"
								bind:value={$updateFormData.note}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field form={updateForm} name="movement_type">
					<Form.Control>
						{#snippet children({ props })}
							<Popover.Root bind:open={openMovement} {...props}>
								<Popover.Trigger bind:ref={triggerRefMovement}>
									{#snippet child({ props })}
										<Input
											type="hidden"
											name="movement_type"
											bind:value={$updateFormData.movement_type}
										/>
										<Button
											variant="outline"
											class="flex w-full justify-between"
											{...props}
											role="combobox"
											aria-expanded={openMovement}
										>
											{selectedMovementTypeUpdate || "Select a Movement Type"}
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
															$updateFormData.movement_type = movementType;
															closeAndFocusTriggerMovement();
														}}
													>
														<Check
															class={cn(
																$updateFormData.movement_type !== movementType && "text-transparent"
															)}
														/>
														{movementType}
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.List>
									</Command.Root>
								</Popover.Content>
							</Popover.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Muscle Groups -->
				<div class="w-full max-w-[400px] overflow-hidden">
					<div
						class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
								flex gap-2 overflow-x-auto py-2"
					>
						{#each $updateFormData.muscle_groups as group}
							<Badge class="min-w-[80px] flex-shrink-0">
								{group}
								<Button
									type="button"
									onclick={() => removeMuscleGroup(group)}
									class="text-red-500 hover:text-red-700"
								>
									&times;
								</Button>
							</Badge>
						{/each}
					</div>
				</div>

				<Form.Field form={updateForm} name="muscle_groups">
					<Form.Control>
						{#snippet children({ props })}
							<Popover.Root bind:open={openMuscle} {...props}>
								<Popover.Trigger bind:ref={triggerRefMuscle}>
									{#snippet child({ props })}
										<Input
											type="hidden"
											name="muscle_groups"
											bind:value={$updateFormData.muscle_groups}
										/>
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
										<Command.Input placeholder="Search Muscle groups..." />
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
														<Check
															class={cn(
																!$updateFormData.muscle_groups.includes(muscleGroup) &&
																	"text-transparent"
															)}
														/>
														{muscleGroup}
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.List>
									</Command.Root>
								</Popover.Content>
							</Popover.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="flex w-1/2 translate-y-1/4 flex-col">
				<Form.Field form={updateForm} name="instructions" class="flex-1">
					<Form.Control>
						{#snippet children({ props })}
							<Input type="hidden" name="instructions" bind:value={$updateFormData.instructions} />
							<div
								class={cn(
									"scrollbar-thin scrollbar-thumb-gray-200 overflow-y-auto rounded-md border-2 border-gray-500 p-2",
									"max-h-44"
								)}
							>
								<h3 class="text-md mb-2 text-center font-semibold text-white">Instructions</h3>
								<ul class="space-y-2">
									{#each $updateFormData.instructions as instruction, index}
										<li class="flex items-center">
											<Input
												type="text"
												class="w-full bg-transparent text-xs font-semibold text-white"
												bind:value={$updateFormData.instructions[index]}
												placeholder="Add instruction"
											/>
											<Button
												type="button"
												onclick={() => removeInstruction(index)}
												class="ml-2 text-red-500 hover:text-red-700"
											>
												&times;
											</Button>
										</li>
									{/each}
									<li class="rounded-md border border-gray-500 p-2 text-center text-sm text-white">
										<Button type="button" onclick={addInstruction}>+ Add Instruction</Button>
									</li>
								</ul>
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="flex w-[50px] flex-col items-center justify-center gap-2">
				<Form.Button
					class="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-gray-800 transition-all hover:bg-gray-300"
					aria-label="Save"
					type="submit"
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
				</Form.Button>
				<Button
					class="flex h-10 w-10 items-center justify-center rounded-md bg-red-200 text-gray-800 transition-all hover:bg-red-300"
					aria-label="Cancel"
					onclick={(e) => handleCancel(e, exercise!!)}
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
				</Button>
			</div>
		</form>
	</div>
{:else if createMode && !editMode}
	<div
		class={cn(
			"group relative flex items-start gap-4 rounded-lg border p-3 text-left text-sm",
			"bg-muted transition-all duration-300 ease-in-out",
			"border-gray-500 bg-gray-800"
		)}
	>
		<form method="POST" action="?/createExercise" use:createEnhance class="flex w-full gap-6">
			<!-- Left Column -->
			<div class="w-1/2 space-y-3">
				<Form.Field form={createForm} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Input
								{...props}
								class="w-full bg-transparent text-xl font-semibold text-white"
								bind:value={$createFormData.name}
								placeholder="Exercise Name"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field form={createForm} name="note">
					<Form.Control>
						{#snippet children({ props })}
							<Input
								{...props}
								class="w-full bg-transparent text-xs font-semibold text-white"
								placeholder="Type a note about the exercise here"
								bind:value={$createFormData.note}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field form={createForm} name="movement_type">
					<Form.Control>
						{#snippet children({ props })}
							<Popover.Root bind:open={openMovement} {...props}>
								<Popover.Trigger bind:ref={triggerRefMovement}>
									{#snippet child({ props })}
										<Input
											type="hidden"
											name="movement_type"
											bind:value={$createFormData.movement_type}
										/>
										<Button
											variant="outline"
											class="flex w-full justify-between"
											{...props}
											role="combobox"
											aria-expanded={openMovement}
										>
											{selectedMovementTypeCreate || "Select a Movement Type"}
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
															$createFormData.movement_type = movementType;
															closeAndFocusTriggerMovement();
														}}
													>
														<Check
															class={cn(
																$createFormData.movement_type !== movementType && "text-transparent"
															)}
														/>
														{movementType}
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.List>
									</Command.Root>
								</Popover.Content>
							</Popover.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Muscle Groups -->
				<div
					class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
				>
					{#each $createFormData.muscle_groups as group}
						<Badge>
							{group}
							<Button
								type="button"
								onclick={() => removeMuscleGroup(group)}
								class="text-red-500 hover:text-red-700"
							>
								&times;
							</Button>
						</Badge>
					{/each}
				</div>

				<Form.Field form={updateForm} name="muscle_groups">
					<Form.Control>
						{#snippet children({ props })}
							<Popover.Root bind:open={openMuscle} {...props}>
								<Popover.Trigger bind:ref={triggerRefMuscle}>
									{#snippet child({ props })}
										<Input
											type="hidden"
											name="muscle_groups"
											bind:value={$createFormData.muscle_groups}
										/>
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
										<Command.Input placeholder="Search Muscle groups..." />
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
														<Check
															class={cn(
																!$createFormData.muscle_groups.includes(muscleGroup) &&
																	"text-transparent"
															)}
														/>
														{muscleGroup}
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.List>
									</Command.Root>
								</Popover.Content>
							</Popover.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="flex w-1/2 translate-y-1/4 flex-col">
				<Form.Field form={createForm} name="instructions" class="flex-1">
					<Form.Control>
						{#snippet children({ props })}
							<Input type="hidden" name="instructions" bind:value={$createFormData.instructions} />
							<div
								class={cn(
									"scrollbar-thin scrollbar-thumb-gray-200 overflow-y-auto rounded-md border-2 border-gray-500 p-2",
									"max-h-44"
								)}
							>
								<h3 class="text-md mb-2 text-center font-semibold text-white">Instructions</h3>
								<ul class="space-y-2">
									{#each $createFormData.instructions as instruction, index}
										<li class="flex items-center">
											<Input
												type="text"
												class="w-full bg-transparent text-xs font-semibold text-white"
												bind:value={$createFormData.instructions[index]}
												placeholder="Add instruction"
											/>
											<Button
												type="button"
												onclick={() => removeInstruction(index)}
												class="ml-2 text-red-500 hover:text-red-700"
											>
												&times;
											</Button>
										</li>
									{/each}
									<li class="rounded-md border border-gray-500 p-2 text-center text-sm text-white">
										<Button type="button" onclick={addInstruction}>+ Add Instruction</Button>
									</li>
								</ul>
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<!-- Buttons Column (Fixed Size) -->
			<div class="flex w-[50px] flex-col items-center justify-center gap-2">
				<Form.Button
					class="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-gray-800 transition-all hover:bg-gray-300"
					aria-label="Edit"
					type="submit"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-plus text-black"><path d="M5 12h14" /><path d="M12 5v14" /></svg
					>
				</Form.Button>
				<Button
					class="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-gray-800 transition-all hover:bg-gray-300"
					aria-label="Delete"
					onclick={(e) => handleCancelCreate(e, exercise!!)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-x text-black"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</Button>
			</div>
		</form>
	</div>
{/if}
