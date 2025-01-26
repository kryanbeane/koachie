<script lang="ts">
	import { cn } from "$lib/utils.js";

	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { tick } from "svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import Check from "lucide-svelte/icons/check";
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { muscleGroupEnum, movementTypeEnum } from "$lib/data/enums.js";
	import { toast } from "svelte-sonner";
	import MuscleGroupSelect from "@/components/muscle-group-select.svelte";
	import MovementTypeSelect from "@/components/movement-type-select.svelte";

	let { enhance, form, formData, handleCancel, exercise, formAction } = $props();

	function addInstruction() {
		$formData = { ...$formData, instructions: [...$formData.instructions, ""] };
	}

	function removeInstruction(index: number) {
		$formData = {
			...$formData,
			instructions: $formData.instructions.filter((_: any, i: number) => i !== index)
		};
	}
</script>

<div
	class={cn(
		"group relative flex items-start gap-4 rounded-lg border p-3 text-left text-sm",
		"bg-muted transition-all duration-300 ease-in-out",
		"border-gray-500"
	)}
>
	<form method="POST" action={formAction} use:enhance class="flex w-full gap-6">
		<!-- Left Column -->
		<div class="w-1/2 space-y-3">
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Input type="hidden" name="id" bind:value={$formData.id} />
						<Input
							{...props}
							class="w-full bg-transparent text-xl font-semibold text-white"
							bind:value={$formData.name}
							placeholder="Enter exercise name"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="note">
				<Form.Control>
					{#snippet children({ props })}
						<Input
							{...props}
							class="w-full bg-transparent text-xs font-semibold text-white"
							bind:value={$formData.note}
							placeholder="Note"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex w-full items-center">
				<Form.Field {form} name="movement_type" class="w-1/2">
					<Form.Control>
						{#snippet children({ props })}
							<MovementTypeSelect data={formData} {props}></MovementTypeSelect>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="muscle_groups" class="w-1/2">
					<Form.Control>
						{#snippet children({ props })}
							<MuscleGroupSelect data={formData} {props}></MuscleGroupSelect>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<!-- Muscle Groups -->
			<div class="w-full max-w-[500px]">
				<div
					class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
								flex gap-2 overflow-x-auto py-2"
				>
					{#each $formData.muscle_groups as group}
						<Badge class="min-w-[80px] flex-shrink-0">
							{group}
						</Badge>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex w-1/2 items-center">
			<Form.Field {form} name="instructions" class="flex-1">
				<Form.Control>
					{#snippet children({ props })}
						<Input type="hidden" name="instructions" bind:value={$formData.instructions} />
						<div
							class={cn(
								"scrollbar-thin scrollbar-thumb-gray-200 overflow-y-auto rounded-md border-2 border-white p-2",
								"max-h-44"
							)}
						>
							<!-- <h3 class="text-md mb-2 text-center font-semibold text-white">Instructions</h3> -->
							<ul class="space-y-2">
								{#each $formData.instructions as instruction, index}
									<li class="flex items-center">
										<Input
											type="text"
											class="w-full bg-transparent text-xs font-semibold text-white"
											bind:value={$formData.instructions[index]}
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
								<li
									class="rounded-md border border-white bg-white p-0.5 text-center text-sm text-white"
								>
									<Button class="w-full" type="button" onclick={addInstruction}
										>+ Add Instruction</Button
									>
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
				onclick={(e) => handleCancel(e, exercise || null)}
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
