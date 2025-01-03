<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { CircleX } from 'lucide-svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props();
</script>

<tr
	bind:this={ref}
	class={cn(
		'group border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<td class="relative">
		<CircleX
			size="16"
			class="absolute right-2 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100"
		/>
	</td>
</tr>
