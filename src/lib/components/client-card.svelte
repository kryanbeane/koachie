<script lang="ts">
	import * as Avatar from "@/components/ui/avatar";
	import { getSelectedClientState } from "@/stores/selected_client_state.svelte";

	const client = $props();

	let selected_client_state = getSelectedClientState();
	function handleClick() {
		selected_client_state.set(client);
	}
</script>

<div class="space-y-8">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="mb-4 flex cursor-pointer items-center rounded-md p-1 transition hover:bg-gray-500"
		onclick={handleClick}
	>
		<Avatar.Root class="flex h-9 w-9 items-center justify-center space-y-0 border">
			<Avatar.Image src="" alt="Avatar" />
			<Avatar.Fallback>JL</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">{client.first_name} {client.last_name}</p>
			<p class="text-sm text-muted-foreground">{client.email}</p>
		</div>
		<!-- <div class="ml-auto font-medium">+$39.00</div> -->
	</div>
</div>
