<script lang="ts">
	import { routeStore } from '@/stores/route.store';
	import WorkoutsStuff from './(components)/(table)/workouts_stuff.svelte';

	routeStore.set('Workouts');

	export let data;
</script>

<WorkoutsStuff
	workouts={data.workouts!!}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={4}
/>
