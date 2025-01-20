import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent }) => {
	// Fetch data from child route
	const childData = await parent();

	return {
		...childData // Preserve existing properties like `session`, `supabase`, etc.
	};
};
