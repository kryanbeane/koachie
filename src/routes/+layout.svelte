<script lang="ts">
	import "../app.css";
	import type { LayoutData } from "./$types";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import { deepMerge, MetaTags } from "svelte-meta-tags";
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "svelte-sonner";
	import { setAllWorkoutState } from "@/stores/all_workout_state.svelte";
	import { setSelectedWorkoutState } from "@/stores/selected_workout_state.svelte";
	import { setAllExerciseState } from "@/stores/all_exercise_state.svelte";
	import { setDebugState } from "@/stores/debug_state.svelte";
	import { setAllClientState } from "@/stores/all_clients_state.svelte";
	import { setSelectedClientState } from "@/stores/selected_client_state.svelte";

	interface Props {
		data: LayoutData;
		children: import("svelte").Snippet;
	}

	let { data, children }: Props = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	});

	let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags || {}));

	setAllWorkoutState();
	setSelectedWorkoutState();
	setSelectedClientState();
	setAllExerciseState();
	setAllClientState();
	setDebugState();
</script>

<ModeWatcher defaultMode="system" />
<Toaster position="top-center" />
<MetaTags {...metaTags} />

<main class="flex items-center gap-2 px-4">
	{@render children?.()}
</main>
