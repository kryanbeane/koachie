<script lang="ts">
	import { routeStore } from "@/stores/route.store";
	import * as Resizable from "$lib/components/ui/resizable";
	import type { PageData } from "./$types";
	import { Button } from "@/components/ui/button";
	import { EllipsisVertical, Search, Trash2 } from "lucide-svelte";
	import { Input } from "@/components/ui/input";
	import { getAllClientState } from "@/stores/all_clients_state.svelte";
	import ClientCard from "@/components/client-card.svelte";
	import * as DropdownMenu from "@/components/ui/dropdown-menu";
	import { Separator } from "@/components/ui/separator";
	import { getSelectedClientState } from "@/stores/selected_client_state.svelte";
	import ClientPage from "./(components)/client-page.svelte";
	import DeleteClientDialog from "./(components)/delete-client-dialog.svelte";

	let { data }: { data: PageData } = $props();
	let clientsState = getAllClientState();
	let selectedClientState = getSelectedClientState();

	let searchQuery = $state("");

	clientsState.set(data.clients);
	routeStore.set("Clients");

	let filteredClients = $derived(
		clientsState.clients.filter(
			(client) =>
				client.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				client.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				client.email.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	let create_mode = $state(false);
</script>

<!-- TODO: Add caching to pane sizes -->
<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={24} minSize={24}>
		<form class="flex w-full items-center p-4">
			<div class="relative flex-grow">
				<Search
					class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
				/>
				<Input placeholder="Search" class="w-full pl-8" bind:value={searchQuery} />
			</div>
		</form>

		{#if data.clients.length > 0}
			<!-- Scrollable List -->
			<div
				class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 max-h-[300px] overflow-y-auto"
			>
				{#each filteredClients as client}
					<ClientCard {...client} />
				{/each}
			</div>
		{:else}
			<!-- Empty State -->
			<div class="flex h-full items-center justify-center">
				<p class="text-muted-foreground">No clients found</p>
			</div>
		{/if}
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane
		minSize={24}
		defaultSize={100}
		class="flex h-full flex-grow items-center justify-center p-6"
	>
		{#if data.clients.length < 0}
			<div class="flex h-full items-center justify-center">
				<p class="text-muted-foreground">No clients found</p>
			</div>
		{/if}

		<div class="mt-6 flex h-full flex-grow flex-col">
			<div class="mb-1 flex items-center p-2">
				{#if selectedClientState.Client}
					<div class="ml-auto flex items-center gap-2">
						<Separator orientation="vertical" class="mx-2 h-6" />
						<DropdownMenu.Root>
							<DropdownMenu.Trigger
								id="more_options_dropdown"
								disabled={!selectedClientState.Client}
							>
								<Button size="sm" variant="ghost">
									<EllipsisVertical class="size-4" />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Item id="delete_client" onclick={(e) => e.preventDefault()}>
									<DeleteClientDialog
										client_id={selectedClientState.Client.id}
										all_clients={clientsState}
										{selectedClientState}
									/>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				{/if}
			</div>
			<Separator />
			{#if selectedClientState.Client}
				<ClientPage data={selectedClientState.Client} />
			{:else}
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">No Client Selected</span>
				</div>
			{/if}
		</div></Resizable.Pane
	>
</Resizable.PaneGroup>
