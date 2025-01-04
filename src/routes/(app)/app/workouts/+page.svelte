<script lang="ts">
	import { routeStore } from '@/stores/route.store';
	import WorkoutView from './(components)/(table)/workouts_view.svelte';

	routeStore.set('Workouts');

	export let data;
</script>

<WorkoutView workouts={data.workouts!!} defaultLayout={data.layout} />
