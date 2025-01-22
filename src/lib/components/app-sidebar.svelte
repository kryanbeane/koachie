<script lang="ts" module>
	import Frame from "lucide-svelte/icons/frame";
	import GalleryVerticalEnd from "lucide-svelte/icons/gallery-vertical-end";
	import SquareTerminal from "lucide-svelte/icons/square-terminal";

	export let data: PageData;

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
						title: "Workouts",
						url: "/app/workouts"
					},
					{
						title: "Exercises",
						url: "/app/exercises"
					}
				]
			}
		],
		projects: [
			{
				name: "Design Engineering",
				url: "#",
				icon: Frame
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
	import type { PageData } from "../../routes/(landing)/$types";

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
