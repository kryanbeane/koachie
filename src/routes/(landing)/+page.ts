import type { PageLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load: PageLoad = async () => {
	const pageMetaTags: MetaTagsProps = {
		title: 'Acme',
		titleTemplate: ''
	};

	return {
		pageMetaTags
	};
};
