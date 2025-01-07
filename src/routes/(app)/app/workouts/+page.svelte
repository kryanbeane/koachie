<script lang="ts">
	import { routeStore } from '@/stores/route.store';
	import WorkoutView from './(components)/(table)/workouts_view.svelte';
	import type { PageData } from './$types';
	import { getAllWorkoutState } from '@/stores/allWorkoutState.svelte';

	export let data: PageData;
	console.log('awdawdawdajiodahdks', data.workouts);
	let workoutsState = getAllWorkoutState();
	workoutsState.set(data.workouts);

	routeStore.set('Workouts');
</script>

<WorkoutView data={data.form} defaultLayout={data.layout} />
