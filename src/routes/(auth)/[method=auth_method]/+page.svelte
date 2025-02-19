<script lang="ts">
	import type { PageServerData } from "./$types";

	import ArrowLeftIcon from "lucide-svelte/icons/arrow-left";

	import { historyBack } from "@/components/actions";
	import { BrandedSplitScreen } from "@/components/layouts";
	import { buttonVariants } from "@/components/ui/button";
	import { cn } from "@/utils";

	import AuthForm from "../auth/auth-form.svelte";

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();
	let { method, emailAuthForm } = $derived(data);
</script>

<div class="absolute left-3 top-3 z-50">
	<button
		class={cn(
			buttonVariants({ variant: "ghost", size: "icon" }),
			"rounded-full text-muted-foreground"
		)}
		use:historyBack
	>
		<ArrowLeftIcon />
	</button>
</div>

<!-- <BrandedSplitScreen>
	<AuthForm {method} form={emailAuthForm} />
</BrandedSplitScreen> -->

<div class="flex h-screen w-screen items-center justify-center">
	<div class="w-full max-w-md rounded-lg p-6 shadow-lg">
		<AuthForm {method} form={emailAuthForm} />
	</div>
</div>
