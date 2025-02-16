<script lang="ts" module>
	import { clientInviteSchema, type ClientInvite } from "@/schemas/client_invites";
	import { toast } from "svelte-sonner";
	import type { FormResult } from "sveltekit-superforms";
	import { superForm } from "sveltekit-superforms/client";
	import { zodClient } from "sveltekit-superforms/adapters";
	import type { ActionData } from "../../routes/(app)/app/$types";
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "@/components/ui/input";
	import { Button } from "@/components/ui/button";
</script>

<script lang="ts">
	const { data } = $props();

	let copyCode = $state(false);
	const inviteCode = crypto.randomUUID().slice(0, 6);
	let formEmail = $state("");

	const form = superForm(data.createForm, {
		id: "create-invite-form",
		validators: zodClient(clientInviteSchema),
		resetForm: true,

		async onUpdate({ form, result }) {
			const action = result.data as FormResult<ActionData>;

			if (form.id) {
				toast.success(`Email Sent!`);
				copyCode = true;
				formEmail = form.data.email;
			} else {
				console.error("onUpdate", result.data.form.errors);
				//form data
				console.log("form data", form.data);
			}
		}
	});

	const { form: formData, enhance: createEnhance } = form;

	formData.set({
		code: inviteCode,
		coach_id: data.user.id
	});

	function copyTextToClipboard(textToCopy: string) {
		if (navigator?.clipboard?.writeText) {
			return navigator.clipboard.writeText(textToCopy);
		}
		return Promise.reject("The Clipboard API is not available.");
	}

	async function handleGetInvite(invite: ClientInvite) {
		const url = new URL("/api/client_invites", window.location.origin);
		url.searchParams.append("email", invite.email);
		url.searchParams.append("coach_id", invite.coach_id);

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data);
			return data;
		} else {
			console.error("Failed to retrieve invite");
		}
	}

	async function copyInviteCode() {
		const invite = await handleGetInvite({
			email: formEmail,
			coach_id: data.user.id,
			code: ""
		});
		const code = invite.data[0].code;
		copyTextToClipboard(code);
		toast.success("Invite link copied to clipboard " + code);
	}

	async function copyInviteLink() {
		const invite = await handleGetInvite({
			email: formEmail,
			coach_id: data.user.id,
			code: ""
		});
		const code = invite.data[0].code;
		copyTextToClipboard(code + "/linktoapp"); //TODO
		toast.success("Invite link copied to clipboard " + code);
	}
</script>

<div class="grid gap-4">
	<div class="space-y-2">
		<h4 class="font-medium leading-none">Generate invite link</h4>
	</div>
	<div class="grid gap-2">
		<form method="POST" action="?/create_invite" use:createEnhance>
			<div class="grid grid-cols-3 items-center gap-4">
				{#if !copyCode}
					<Form.Field {form} name="email" class="col-span-2">
						<Form.Control>
							{#snippet children({ props })}
								<Input type="hidden" name="code" bind:value={$formData.code} />
								<Input type="hidden" name="coach_id" bind:value={$formData.coach_id} />
								<Input
									{...props}
									bind:value={$formData.email}
									placeholder="Enter email"
									class="h-8"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors class="text-sm text-red-500" />
					</Form.Field>
				{/if}
			</div>
			{#if !copyCode}
				<Form.Button type="submit" class="col-span-1 h-8" variant="secondary">Generate</Form.Button>
			{:else}
				<Button class="col-span-1 h-8" variant="secondary" onclick={copyInviteLink}
					>Copy Link</Button
				>
				<Button class="col-span-1 h-8" variant="secondary" onclick={copyInviteCode}
					>Copy Code</Button
				>
			{/if}
		</form>
	</div>
</div>
