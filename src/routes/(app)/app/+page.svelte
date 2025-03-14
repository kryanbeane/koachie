<script lang="ts">
	import { routeStore } from "@/stores/route.store";
	import type { PageData } from "./$types";
	import { Button } from "@/components/ui/button";
	import { Activity, Copy, CreditCard, DollarSign, Users } from "lucide-svelte";
	import * as Card from "@/components/ui/card";
	import Badge from "@/components/ui/badge/badge.svelte";
	import { onMount } from "svelte";
	import * as Avatar from "@/components/ui/avatar";
	import { toast } from "svelte-sonner";
	import ClientCard from "@/components/client-card.svelte";
	import { fetchImage, uploadImageFromUrl } from "@/storage/images";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import Fa from "svelte-fa";
	import CreateInviteLinkForm from "@/forms/create_invite_link_form.svelte";

	let { data }: { data: PageData } = $props();
	routeStore.set("Dashboard");

	async function uploadImage() {
		let userProfilePic = data.user?.user_metadata.avatar_url;
		try {
			if (data.user?.user_metadata.avatar_url) {
				const uploadData = await uploadImageFromUrl(data.supabase, userProfilePic, data.user?.id);
				userProfilePic = uploadData;
				console.log("User profile pic:", userProfilePic);
			}
		} catch (error) {
			console.error("Error caching profile picture:", error);
		}

		return userProfilePic;
	}

	async function getProfilePic() {
		let signedUrl = "";
		try {
			if (data.user?.user_metadata.avatar_url) {
				signedUrl = await fetchImage(data.supabase, data.user?.id);
			}
		} catch (error) {
			console.error("Error caching profile picture:", error);
		}
		return signedUrl;
	}

	let profileURL = $state("");
	let targetNumber = data.numClients;
	let displayNumber = $state(0);
	let duration = 100;

	onMount(async () => {
		let startTime: number;
		const step = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const randomFluctuation = Math.random() * (1 - progress) * targetNumber * 0.2;
			displayNumber = Math.floor(progress * targetNumber + randomFluctuation);
			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				displayNumber = targetNumber;
			}
		};
		requestAnimationFrame(step);

		profileURL = await getProfilePic();
	});
</script>

<div class="hidden flex-col md:flex">
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between">
			<!-- Left Section: Avatar and Greeting -->
			<div class="flex items-center space-x-4">
				<Avatar.Root class="h-20 w-20 rounded-lg">
					<Avatar.Image src={profileURL} alt={data.user?.user_metadata.full_name} />
					<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="">
					<h2 class="text-3xl font-bold tracking-tight">
						Hello {data.user?.user_metadata.full_name} 👋
					</h2>
					<Badge class="bg-green-600">Clients: {displayNumber}</Badge>
					<Badge class="">Exercises: {data.numExercises}</Badge>
					<Badge class="">Workouts: {data.numWorkouts}</Badge>
					<Badge class="">Programs: 22</Badge>
				</div>
			</div>

			<!-- Right Section: Invite Link Button -->
			<div>
				<Popover.Root>
					<Popover.Trigger class={buttonVariants({ variant: "outline" })}>
						<Copy class="mr-2 h-4 w-4" /> Invite</Popover.Trigger
					>
					<Popover.Content class="w-80">
						<CreateInviteLinkForm {data} />
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<div class="space-y-4">
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
						<Users class="h-4 w-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">+2350</div>
						<p class="text-xs text-muted-foreground">+180.1% from last month</p>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Active Now</Card.Title>
						<Activity class="h-4 w-4 text-muted-foreground" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">+573</div>
						<p class="text-xs text-muted-foreground">+201 since last hour</p>
					</Card.Content>
				</Card.Root>
			</div>
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card.Root class="col-span-4">
					<Card.Header>
						<Card.Title>Overview</Card.Title>
					</Card.Header>
					<Card.Content>
						<!-- <Overview /> -->
					</Card.Content>
				</Card.Root>
				<Card.Root class="col-span-3">
					<Card.Header>
						<Card.Title>Recent Clients</Card.Title>
						<Card.Content>
							<div
								class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 max-h-[300px] overflow-y-auto"
							>
								{#each data.clients as client}
									<ClientCard {...client} />
								{/each}
							</div>
						</Card.Content>
					</Card.Header>
				</Card.Root>
			</div>
		</div>
		<!-- </Tabs.Root> -->
	</div>
</div>
