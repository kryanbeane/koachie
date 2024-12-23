<script lang="ts">
	import { type PageData } from './$types';

	export let data: PageData;
	let title = data.title;
</script>

I am in the page {title}
