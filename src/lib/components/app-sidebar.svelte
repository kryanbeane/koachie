<script lang="ts" module>
	import Bot from "lucide-svelte/icons/bot";
	import ChartPie from "lucide-svelte/icons/chart-pie";
	import Frame from "lucide-svelte/icons/frame";
	import GalleryVerticalEnd from "lucide-svelte/icons/gallery-vertical-end";
	import Map from "lucide-svelte/icons/map";
	import SquareTerminal from "lucide-svelte/icons/square-terminal";

	// This is sample data.
	const sample_data = {
		user: {
			name: "bryan",
			email: "m@example.com",
			avatar: ""
		},
		teams: [
			{
				name: "Koach",
				logo: GalleryVerticalEnd,
				plan: "Enterprise"
			}
		],
		navMain: [
			{
				title: "Library",
				url: "#",
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: "Programs",
						url: "/app/programs"
					},
					{
						title: "Workouts",
						url: "/app/workouts"
					},
					{
						title: "Exercises",
						url: "/app/exercises"
					}
				]
			},
			{
				title: "Models",
				url: "#",
				icon: Bot,
				items: [
					{
						title: "Genesis",
						url: "#"
					},
					{
						title: "Explorer",
						url: "#"
					},
					{
						title: "Quantum",
						url: "#"
					}
				]
			}
		],
		projects: [
			{
				name: "Design Engineering",
				url: "#",
				icon: Frame
			},
			{
				name: "Sales & Marketing",
				url: "#",
				icon: ChartPie
			},
			{
				name: "Travel",
				url: "#",
				icon: Map
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from "$lib/components/nav-main.svelte";
	import NavProjects from "$lib/components/nav-projects.svelte";
	import NavUser from "$lib/components/nav-user.svelte";
	import TeamSwitcher from "$lib/components/team-switcher.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import type { PageData } from "../../routes/(landing)/$types";
	import Page from "../../routes/(landing)/+page.svelte";
	import Layout from "../../routes/+layout.svelte";
	import type { LayoutData } from "../../routes/$types";

	type CollapsibleType = "none" | "icon" | "offcanvas" | undefined;

	let {
		ref = $bindable(null),
		collapsible = "icon" as CollapsibleType,
		data,
		...restProps
	} = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={sample_data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={sample_data.navMain} />
		<NavProjects projects={sample_data.projects} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
