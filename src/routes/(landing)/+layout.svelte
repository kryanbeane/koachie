<script lang="ts">
	import { type Snippet } from 'svelte';

	import Navbar from './components/navbar.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-dvh">
	<Navbar />
	{@render children?.()}
</div>
