<script lang="ts" module>
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";

	export const inputVariants = tv({
		base: "flex h-10 w-full rounded-md border-0 bg-background py-2 text-base placeholder:text-muted-foreground md:text-sm",
		variants: {
			variant: {
				default: "",
				set: "text-center"
				// set: "max-w-[1.75rem] flex-shrink-0 border-0 bg-transparent text-center text-sm font-normal text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
			},
			sizing: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10"
			}
		},
		defaultVariants: {
			variant: "default",
			sizing: "default"
		}
	});

	export type InputVariant = VariantProps<typeof inputVariants>["variant"];
	export type InputSize = VariantProps<typeof inputVariants>["sizing"];

	export type InputProps = WithElementRef<HTMLInputAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: InputVariant;
			sizing?: InputSize;
		};
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		variant = "default",
		sizing = "default",
		children,
		ref = $bindable(null),
		value = $bindable(),
		...restProps
	}: InputProps = $props();
</script>

<input
	bind:this={ref}
	class={cn(inputVariants({ variant, sizing }), className)}
	bind:value
	{...restProps}
/>
