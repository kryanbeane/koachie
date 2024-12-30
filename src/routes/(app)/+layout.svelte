<script lang="ts">
	import '../../app.css';
	import type { LayoutData } from './$types';

	import * as Sidebar from '@/components/ui/sidebar';
	import AppSidebar from '@/components/app-sidebar.svelte';
	import { Separator } from '@/components/ui/separator';
	import { routeStore } from '@/stores/route.store';

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
			<main class="flex items-center gap-2 px-2">
				<Sidebar.Trigger />
				<Separator orientation="vertical" class="mr-2 h-4" />
				{$routeStore}
			</main>
		</header>

		<div class="flex flex-1 flex-col p-4 pt-0">
			<!-- Render children without grid -->
			<div class="flex flex-1">
				{@render children?.()}
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
