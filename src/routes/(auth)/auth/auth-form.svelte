<script lang="ts">
	import type { SuperValidated } from "sveltekit-superforms";

	import OAuth from "./oauth.svelte";

	import { type EmailPassswordAuthSchema } from "@/schemas";
	import * as Card from "@/components/ui/card";
	import { Separator } from "@/components/ui/separator";
	import EmailPasswordAuth from "./email-password-auth.svelte";

	interface Props {
		form: SuperValidated<EmailPassswordAuthSchema>;
		method: string;
	}

	let { form, method }: Props = $props();

	let methodString = $derived(method === "login" ? "Log in" : "Sign up");
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>
			{methodString}
		</Card.Title>
		<Card.Description>This will only take a few moments.</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-3 lg:space-y-5">
		<EmailPasswordAuth {form} />
		<Separator />
		<OAuth />
	</Card.Content>
</Card.Root>
<div class="text-center">
	<div>
		{method === "login" ? "New user?" : "Have an account?"}
		<a href={method === "login" ? "/signup" : "/login"} class="underline underline-offset-4">
			{method === "login" ? "Create account." : "Log in."}
		</a>
	</div>
</div>
