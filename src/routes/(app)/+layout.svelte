<script lang="ts">
	import "../../app.css";
	import type { LayoutData } from "./$types";

	import * as Sidebar from "@/components/ui/sidebar";
	import AppSidebar from "@/components/app-sidebar.svelte";
	import { Separator } from "@/components/ui/separator";
	import { routeStore } from "@/stores/route.store";
	import { ThemeToggle } from "@/components/theme-controller";
	import Badge from "@/components/ui/badge/badge.svelte";

	interface Props {
		data: LayoutData;
		children: import("svelte").Snippet;
	}

	let { children, data }: Props = $props();

	let currentTime = $state(formatDate(new Date()));

	function formatDate(date: number | Date | undefined) {
		const datePart = new Intl.DateTimeFormat("en-US", {
			weekday: "long",
			day: "numeric",
			month: "long"
		}).format(date);

		const timePart = new Intl.DateTimeFormat("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		}).format(date);

		return `${datePart}, ${timePart}`;
	}

	const updateTime = () => {
		currentTime = formatDate(new Date());
	};

	setInterval(updateTime, 60000);
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<Sidebar.Provider class="flex flex-1 overflow-hidden">
		<AppSidebar {data} />

		<Sidebar.Inset class="flex h-full w-full flex-col">
			<header
				class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
			>
				<div class="flex items-center gap-2 px-2">
					<Sidebar.Trigger />
					<Separator orientation="vertical" class="mr-2 h-4" />
					{$routeStore}
				</div>
				<div class="mx-4 ml-auto items-end">
					<Badge class="ml-2">
						{currentTime.toLocaleString()}
					</Badge>
					<ThemeToggle />
				</div>
			</header>

			<main class="flex flex-1 flex-col overflow-hidden">
				<div class="flex-grow overflow-hidden">
					{@render children?.()}
				</div>
			</main>
		</Sidebar.Inset>
	</Sidebar.Provider>
</div>
