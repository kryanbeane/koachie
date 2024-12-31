<script lang="ts">
	import { onMount } from 'svelte';

	let time = '00:00';

	function handleTimeInput(event: Event) {
		const input = event.target as HTMLInputElement;
		time = input.value.replace(/\D/g, ''); // Remove non-digit characters

		if (time.length > 4) {
			time = time.slice(0, 4); // Limit to 4 digits
		}

		// Format the time as MM:SS
		if (time.length > 2) {
			time = time.slice(0, 2) + ':' + time.slice(2);
		}
	}
</script>

<input
	type="text"
	class="w-20 bg-muted/10 text-center text-white"
	placeholder="00:00"
	bind:value={time}
	on:input={handleTimeInput}
/>
