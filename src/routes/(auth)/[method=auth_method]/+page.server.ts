import type { PageServerLoad } from "./$types";

import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

import { emailPasswordAuthSchema } from "@/schemas";

import type { MetaTagsProps } from "svelte-meta-tags";

export const load: PageServerLoad = async ({ params }) => {
	const { method } = params;
	const methodString = method === "login" ? "Log in" : "Sign up";

	const pageMetaTags: MetaTagsProps = {
		title: methodString
	};

	return {
		pageMetaTags,
		method,
		form: await superValidate(zod(emailPasswordAuthSchema))
	};
};
