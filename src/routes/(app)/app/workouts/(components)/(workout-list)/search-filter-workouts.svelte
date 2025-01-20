<script lang="ts">
	import { buttonVariants } from "@/components/ui/button";
	import { Input } from "@/components/ui/input";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Search, Filter, User } from "lucide-svelte";

	let { searchQuery = $bindable() }: { searchQuery: string } = $props();
</script>

<form class="flex w-full items-center p-4">
	<div class="relative flex-grow">
		<Search class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground" />
		<Input placeholder="Search" class="w-full pl-8" bind:value={searchQuery} />
	</div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={`${buttonVariants({ variant: "secondary", size: "icon" })} ml-2`}>
			<Filter />
		</DropdownMenu.Trigger>

		<DropdownMenu.Content class="w-56">
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading>Filter</DropdownMenu.GroupHeading>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<User class="mr-2 size-4" />
					<span>Lorem Ipsum</span>
					<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</form>
