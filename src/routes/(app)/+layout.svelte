<script lang="ts">
	import '../../app.css';
	import type { LayoutData } from './$types';

	import * as Sidebar from '@/components/ui/sidebar';
	import AppSidebar from '@/components/app-sidebar.svelte';
	import { Separator } from '@/components/ui/separator';
	import { routeStore } from '@/stores/route.store';
	import { ThemeToggle } from '@/components/theme-controller';

	interface Props {
		data: LayoutData;
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
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
			<div class="mx-4 ml-auto items-end"><ThemeToggle /></div>
		</header>

		<div class="flex h-full flex-1 flex-col gap-4 overflow-hidden p-4 pt-0">
			<div class="h-full flex-grow overflow-hidden">
				{@render children?.()}
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
