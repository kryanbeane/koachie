<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Trash2 } from "lucide-svelte";
	import { toast } from "svelte-sonner";

	const { client_id, all_clients, selectedClientState } = $props();

	let delete_confirmaton = $state("");
	let delete_reason = $state("");

	async function deleteClientFromCoach() {
		if (delete_confirmaton === "Delete Client") {
			const response = await fetch(`/api/clients`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: client_id, reason: delete_reason })
			});

			if (response.ok) {
				all_clients.remove(client_id);
				selectedClientState.clear();
				toast.success(`Client Deleted!`);
			}
		} else {
			toast.error(`Please type "Delete Client" to confirm`);
		}
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
		<Trash2 class="size-4" /> Delete Client</Dialog.Trigger
	>

	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Remove Client</Dialog.Title>
			<Dialog.Description>Are you sure you want to delete this client?</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="items-center gap-4">
				<Label for="delete_confirmaton" class="text-right">Type "Delete Client"</Label>
				<Input
					id="delete_confirmaton"
					placeholder="Delete Client"
					class="col-span-3"
					bind:value={delete_confirmaton}
				/>
			</div>
			<div class="items-center gap-4">
				<Label for="delete_reason" class="text-right">Reason for deleting</Label>
				<Input id="delete_reason" class="col-span-3" bind:value={delete_reason} />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" onclick={deleteClientFromCoach}>Delete</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
