<script lang="ts">
	import '../../app.css';
	import type { LayoutData } from './$types';

	import * as Sidebar from '@/components/ui/sidebar';
	import AppSidebar from '@/components/app-sidebar.svelte';

	interface Props {
		data: LayoutData;
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<main class="flex items-center gap-2">
				<Sidebar.Trigger class="-ml-1" />
				{@render children?.()}
			</main>
		</header>
	</Sidebar.Inset>
</Sidebar.Provider>
