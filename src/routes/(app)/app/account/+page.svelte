<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import SuperDebug from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { tick } from "svelte";

	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button/index.js";

	import { cn } from "$lib/utils.js";
	import { browser } from "$app/environment";
	import * as Select from "@/components/ui/select";
	import { Textarea } from "@/components/ui/textarea";
	import type { PageData } from "./$types";
	import { profileFormSchema } from "@/schemas/profile";
	import { routeStore } from "@/stores/route.store";

	let { data }: { data: PageData } = $props();

	routeStore.set("Account");

	const form = superForm(data.schema, {
		id: "profile-form",
		validators: zodClient(profileFormSchema)

		// onUpdate({ form, result }) {
		// 	const action = result.data as FormResult<ActionData>;
		// 	if (form.valid && action.workout) {
		// 		allWorkoutState.add(action.workout[0]);
		// 		selectedWorkoutState.set(action.workout[0]);
		// 		create_mode = false;
		// 		toast.success(`Workout ${action.workout[0].name} Created!`);
		// 	}
		// }
	});

	const { form: formData, enhance } = form;

	function addUrl() {
		$formData.urls = [...$formData.urls, ""];

		tick().then(() => {
			const urlInputs = Array.from(
				document.querySelectorAll<HTMLElement>("#profile-form input[name='urls']")
			);
			const lastInput = urlInputs[urlInputs.length - 1];
			lastInput && lastInput.focus();
		});
	}
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input placeholder="@shadcn" {...props} bind:value={$formData.username} />
			{/snippet}
		</Form.Control>
		<Form.Description>
			This is your public display name. It can be your real name or a pseudonym. You can only change
			this once every 30 days.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="bio">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Bio</Form.Label>
				<Textarea {...props} bind:value={$formData.bio} />
			{/snippet}
		</Form.Control>
		<Form.Description>
			You can <span>@mention</span> other users and organizations to link to them.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<div>
		<Form.Fieldset {form} name="urls">
			<Form.Legend>URLs</Form.Legend>
			{#each $formData.urls as _, i}
				<Form.ElementField {form} name="urls[{i}]">
					<Form.Description class={cn(i !== 0 && "sr-only")}>
						Add links to your website, blog, or social media profiles.
					</Form.Description>
					<Form.Control>
						{#snippet children({ props })}
							<Input {...props} bind:value={$formData.urls[i]} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
			{/each}
		</Form.Fieldset>
		<Button type="button" variant="outline" size="sm" class="mt-2" onclick={addUrl}>Add URL</Button>
	</div>

	<Form.Button>Update profile</Form.Button>
</form>

<!-- {#if browser}
	<SuperDebug data={$formData} />
{/if} -->
