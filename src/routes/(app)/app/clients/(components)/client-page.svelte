<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "@/components/ui/button";
	import * as Card from "@/components/ui/card";
	import Badge from "@/components/ui/badge/badge.svelte";
	import * as Avatar from "@/components/ui/avatar";

	let { data }: { data: PageData } = $props();

	function calculateAge(dateOfBirth: string) {
		const birth = new Date(dateOfBirth);
		const today = new Date();

		let age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();
		const dayDiff = today.getDate() - birth.getDate();

		if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
			age--;
		}

		return age;
	}

	let age = $derived(calculateAge(data.DOB));
</script>

<div class="hidden flex-col md:flex">
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between">
			<!-- Left Section: Avatar and Greeting -->
			<div class="flex items-center space-x-4">
				<Avatar.Root class="h-20 w-20 rounded-lg">
					<!-- <Avatar.Image
						src={data.user?.user_metadata.avatar_url}
						alt={data.user?.user_metadata.full_name}
					/> -->
					<Avatar.Fallback class="rounded-lg">CL</Avatar.Fallback>
				</Avatar.Root>
				<div class="">
					<h2 class="text-3xl font-bold tracking-tight">
						{data.first_name}
						{data.last_name}
					</h2>
					<Badge class="bg-green-600">Programs: 1</Badge>
					<Badge>Age: {age}</Badge>
					<Badge>Height: {data.height}cm</Badge>
					<Badge>Gender: {data.gender}</Badge>
				</div>
			</div>

			<!-- Right Section: Invite Link Button -->
			<div>
				<Button size="sm">Open Calendar</Button>
			</div>
		</div>

		<div class="space-y-4">
			<div class="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
				<Card.Root>
					<Card.Header>
						<Card.Title>Calories</Card.Title>
					</Card.Header>
					<Card.Content>
						<!-- <Overview /> -->
					</Card.Content>
				</Card.Root>
			</div>
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card.Root class="col-span-4">
					<Card.Header>
						<Card.Title>Steps</Card.Title>
					</Card.Header>
					<Card.Content>
						<!-- <Overview /> -->
					</Card.Content>
				</Card.Root>
				<Card.Root class="col-span-3">
					<Card.Header>
						<Card.Title>Weight</Card.Title>
						<Card.Content>
							<div
								class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 max-h-[300px] overflow-y-auto"
							></div>
						</Card.Content>
					</Card.Header>
				</Card.Root>
			</div>
		</div>
		<!-- </Tabs.Root> -->
	</div>
</div>
