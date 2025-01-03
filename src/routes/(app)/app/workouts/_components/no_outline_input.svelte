<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...restProps
	}: WithElementRef<HTMLInputAttributes> = $props();
</script>

<input
	bind:this={ref}
	class={cn(
		'flex h-10 w-full rounded-md bg-muted/50 px-3 py-2 text-base outline-none placeholder:text-muted-foreground md:text-sm',
		className
	)}
	bind:value
	{...restProps}
/>
