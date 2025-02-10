<script lang="ts">
	import { superForm, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import LoaderCircleIcon from "lucide-svelte/icons/loader-circle";
	import EmailIcon from "lucide-svelte/icons/mail";

	import * as Form from "@/components/ui/form";
	import { Input } from "@/components/ui/input";
	import { type EmailPassswordAuthSchema, emailPasswordAuthSchema } from "@/schemas";

	interface Props {
		form: SuperValidated<EmailPassswordAuthSchema>;
	}

	let { form: formValidator }: Props = $props();

	let loading = $state(false);

	const form = superForm(formValidator, {
		id: "aaaaa",
		validators: zodClient(emailPasswordAuthSchema),
		onSubmit: () => {
			loading = true;
		},
		onResult: () => {
			loading = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="/auth?/emailPassword" class="space-y-2" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} placeholder="Email address" bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input {...props} placeholder="Password" bind:value={$formData.password} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full items-center space-x-1" type="submit" disabled={loading}>
		{#if loading}
			<LoaderCircleIcon class="animate-spin" size="16" />
		{:else}
			<EmailIcon size="16" />
		{/if}
		<span>Continue</span>
	</Form.Button>
</form>
