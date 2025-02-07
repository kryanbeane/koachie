<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "@/components/ui/button";
	import { Activity, Copy, CreditCard, DollarSign, Users } from "lucide-svelte";
	import * as Card from "@/components/ui/card";
	import Badge from "@/components/ui/badge/badge.svelte";
	import * as Avatar from "@/components/ui/avatar";
	import { toast } from "svelte-sonner";
	import * as Carousel from "@/components/ui/carousel";

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

	let age = $state(calculateAge(data.DOB));

	console.log("age", age);
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
					<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="">
					<h2 class="text-3xl font-bold tracking-tight">
						{data.first_name}
					</h2>
					<Badge class="bg-green-600">Programs: 1</Badge>
					<Badge>Age: {age}</Badge>
				</div>
			</div>

			<!-- Right Section: Invite Link Button -->
			<div>
				<Button size="sm">Open Program</Button>
			</div>
		</div>

		<div class="space-y-4">
			<div class="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
				<Carousel.Root class="w-full">
					<Carousel.Content>
						{#each Array(5) as _, i (i)}
							<Carousel.Item>
								<div class="p-1">
									<Card.Root>
										<Card.Content class="flex items-center justify-center p-6">
											<span class="text-4xl font-semibold">{i + 1}</span>
										</Card.Content>
									</Card.Root>
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</div>
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card.Root class="col-span-4">
					<Card.Header>
						<Card.Title>Notifications</Card.Title>
					</Card.Header>
					<Card.Content>
						<!-- <Overview /> -->
					</Card.Content>
				</Card.Root>
				<Card.Root class="col-span-3">
					<Card.Header>
						<Card.Title>Recent Clients</Card.Title>
						<Card.Description>20 extra clients signed up last week.</Card.Description>
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
