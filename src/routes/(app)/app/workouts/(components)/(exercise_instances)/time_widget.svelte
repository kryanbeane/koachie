<script lang="ts">
	import { InputWithVariant } from "@/components/ui/input";

	let time = "";

	function handleTimeInput(event: Event) {
		const input = event.target as HTMLInputElement;
		let value = input.value.replace(/\D/g, ""); // Remove non-numeric characters

		if (value.length > 4) {
			value = value.slice(0, 4);
		}

		if (value.length > 2) {
			value = value.slice(0, 2) + ":" + value.slice(2);
		}

		time = value;
	}
</script>

<InputWithVariant
	class="h-8 w-20"
	variant="set"
	type="text"
	placeholder="00:00"
	bind:value={time}
	oninput={handleTimeInput}
/>
