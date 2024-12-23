<script lang="ts">
	import { enhance } from '$app/forms';

	import Fa from 'svelte-fa';
	import { faGoogle } from '@fortawesome/free-brands-svg-icons';

	import { Button } from '@/components/ui/button';
</script>

<form method="POST" action="/auth?/oauth" class="space-y-2" use:enhance>
	<Button class="w-full space-x-1" variant="secondary" type="submit" name="method" value="google">
		<Fa icon={faGoogle} />
		<span> Google </span>
	</Button>
</form>
