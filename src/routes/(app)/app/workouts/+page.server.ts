import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals: { supabase }, cookies }) => {
	const layoutCookie = cookies.get('PaneForge:layout');
	const collapsedCookie = cookies.get('PaneForge:collapsed');

	let layout: number[] | undefined;
	let collapsed: boolean | undefined;

	if (layoutCookie) layout = JSON.parse(layoutCookie);

	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);

	const { data: workouts } = await supabase.from('workouts').select('*');

	return { layout, collapsed, workouts };
};
