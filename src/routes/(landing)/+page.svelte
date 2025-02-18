<script lang="ts">
	import ArrowRightIcon from "lucide-svelte/icons/arrow-right";

	import { Button } from "@/components/ui/button";
	import * as Card from "@/components/ui/card";
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<h1
		class="text-shadow-[0_4px_6px_rgba(0,0,0,0.1)] flex items-center justify-center border-4 border-transparent bg-gradient-to-br
           from-primary
           to-secondary
           bg-clip-text text-[19vw]
		   font-bold uppercase tracking-wide
           text-transparent"
		style="font-family: 'Orbitron', sans-serif; font-stretch: expanded;"
	>
		KOACH
	</h1>

	<p class="mb-4 flex items-center justify-center text-[2vw] font-bold">
		World's First AI Coaching Platform
	</p>

	<Button
		class="text mx-auto w-auto items-center justify-center"
		variant="outline"
		size="lg"
		href="/login"
	>
		Become a Coach Today
	</Button>
</div>
