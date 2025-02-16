<script lang="ts">
	import { routeStore } from "@/stores/route.store";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
	let searchQuery = $state("");

	routeStore.set("Programs");
</script>

HOLA
