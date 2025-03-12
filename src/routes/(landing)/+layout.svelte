<script lang="ts">
	import { type Snippet } from "svelte";

	import Navbar from "./components/navbar.svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	{@render children?.()}
</div>
