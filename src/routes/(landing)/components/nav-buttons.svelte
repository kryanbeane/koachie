<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	import CircleUserIcon from "lucide-svelte/icons/circle-user";

	import { Button, buttonVariants } from "@/components/ui/button";
	import * as Dropdown from "@/components/ui/dropdown-menu";

	let { session } = $derived($page.data);
</script>

<div class="hidden h-9 w-full justify-between md:flex">
	<!-- <div>
		<Button size="sm" variant="ghost" class="rounded-full text-foreground/60" href="/product">
			Product
		</Button>
		<Button size="sm" variant="ghost" class="rounded-full text-foreground/60" href="/pricing"
			>Pricing</Button
		>
		<Button size="sm" variant="ghost" class="rounded-full text-foreground/60" href="/blog"
			>Blog</Button
		>
	</div> -->
	<div class="flex items-center">
		{#if session}
			<Dropdown.Root>
				<Dropdown.Trigger class={buttonVariants({ variant: "ghost", size: "sm" })}>
					<CircleUserIcon />
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Group>
						<form method="POST" action="/auth?/logout" class="contents" use:enhance>
							<button type="submit" class="contents">
								<Dropdown.Item>Log out</Dropdown.Item>
							</button>
						</form>
					</Dropdown.Group>
				</Dropdown.Content>
			</Dropdown.Root>
		{:else}
			<div>
				<Button size="sm" variant="outline" href="/login">Log in</Button>
				<Button size="sm" href="/signup">Sign up</Button>
			</div>
		{/if}
	</div>
</div>
