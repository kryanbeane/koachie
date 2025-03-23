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
	import * as Card from "@/components/ui/card";
	import * as Avatar from "@/components/ui/avatar";
	import { Badge } from "@/components/ui/badge";

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

<div class="flex items-center justify-between">
	<!-- Left Section: Avatar and Greeting -->
	<div class="flex items-center space-x-4">
		<Avatar.Root class="h-20 w-20 rounded-lg">
			<Avatar.Fallback class="rounded-lg"
				>{data.user?.user_metadata.full_name.charAt(0, 2)}</Avatar.Fallback
			>
		</Avatar.Root>
		<div class="">
			<h2 class="text-3xl font-bold tracking-tight">
				Hello {data.user?.user_metadata.full_name} ⚙️
			</h2>
		</div>
	</div>

	<!-- Right Section: Invite Link Button -->
	<div>
		<Button size="sm">open something</Button>
	</div>
</div>

<div class="mt-4 space-y-4">
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<Card.Root class="col-span-4">
			<Card.Header>
				<Card.Title>Profile</Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" class="space-y-8 p-6" use:enhance id="profile-form">
					<Form.Field {form} name="username">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Username</Form.Label>
								<Input
									placeholder={data.user?.user_metadata.full_name}
									{...props}
									bind:value={$formData.username}
								/>
							{/snippet}
						</Form.Control>
						<Form.Description>This is your public display name.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="bio">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Bio</Form.Label>
								<Textarea {...props} bind:value={$formData.bio} />
							{/snippet}
						</Form.Control>
						<Form.Description>Tell a bit about yourself.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
					<!-- <div>
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
                    </div> -->

					<Form.Button>Update profile</Form.Button>
					<Button>Log out</Button>
					<Button variant="destructive">Delete account</Button>
				</form>
			</Card.Content>
		</Card.Root>
		<Card.Root class="col-span-3">
			<Card.Header>
				<Card.Title>Billing</Card.Title>
				<Card.Content>
					<h2 class="mb-2 text-7xl">€0.00</h2>
					<p>This is your free trial</p>
				</Card.Content>
			</Card.Header>
		</Card.Root>
	</div>
</div>
