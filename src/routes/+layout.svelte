<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { deepMerge, MetaTags } from 'svelte-meta-tags';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';

	interface Props {
		data: LayoutData;
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags || {}));
</script>

<ModeWatcher defaultMode="system" />
<Toaster position="top-center" />
<MetaTags {...metaTags} />

<main class="flex items-center gap-2 px-4">
	{@render children?.()}
</main>
