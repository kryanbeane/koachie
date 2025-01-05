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

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<Sidebar.Provider class="flex flex-1 overflow-hidden">
		<AppSidebar />

		<Sidebar.Inset class="flex h-full w-full flex-col">
			<header
				class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
			>
				<div class="flex items-center gap-2 px-2">
					<Sidebar.Trigger />
					<Separator orientation="vertical" class="mr-2 h-4" />
					{$routeStore}
				</div>
				<div class="mx-4 ml-auto items-end"><ThemeToggle /></div>
			</header>

			<main class="flex flex-1 flex-col overflow-hidden">
				<div class="flex-grow overflow-hidden">
					{@render children?.()}
				</div>
			</main>
		</Sidebar.Inset>
	</Sidebar.Provider>
</div>
