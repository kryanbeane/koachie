<script lang="ts">
	import LogoContainer from "./logo-container.svelte";
	import NavButtons from "./nav-buttons.svelte";
	import MobileMenu from "./mobile-menu.svelte";

	let scrollY: number = $state(0);
</script>

<svelte:window bind:scrollY />

<header class="sticky top-0 w-full border-border bg-background {scrollY > 0 ? 'border-b' : ''}">
	<nav class="flex w-full items-center justify-between px-6 py-4">
		<LogoContainer />
		<div class="ml-auto flex items-center space-x-5">
			<NavButtons />
			<MobileMenu />
		</div>
	</nav>
</header>
