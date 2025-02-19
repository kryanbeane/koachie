<script lang="ts" module>
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";

	export const inputVariants = tv({
		base: "",
		variants: {
			variant: {
				default: "",
				set: "text-center bg-transparent"
			},
			sizing: {
				default: "h-10 px-4 py-2",
				sm: "h-8 w-16 rounded-sm",
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
