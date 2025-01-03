<script lang="ts">
	import { Button, buttonVariants } from '@/components/ui/button/index';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { Label } from '@/components/ui/label';
	import * as Popover from '@/components/ui/popover';
	import { Separator } from '@/components/ui/separator';
	import Switch from '@/components/ui/switch/switch.svelte';
	import { Textarea } from '@/components/ui/textarea';
	import * as Tooltip from '@/components/ui/tooltip/index';
	import type { Workout } from '@/schemas/workouts';
	import { DateFormatter, getDayOfWeek, getLocalTimeZone, now } from '@internationalized/date';
	import {
		Archive,
		ArchiveX,
		Clock,
		EllipsisVertical,
		Forward,
		Reply,
		ReplyAll,
		Trash2
	} from 'lucide-svelte';
	import WorkoutCard from '../workout_card.svelte';

	export let workout: Workout | null = null;

	const fullFormatter = new DateFormatter('en-US', {
		dateStyle: 'medium',
		timeStyle: 'medium'
	});

	const relativeFormatter = new DateFormatter('en-US', {
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h12'
	});
	let todayDate = now(getLocalTimeZone());

	function getClosestWeekend() {
		const dayOfWeek = getDayOfWeek(todayDate, 'en-US');
		if (dayOfWeek === 6) {
			return todayDate.toDate();
		}
		return todayDate.add({ days: 6 - dayOfWeek }).toDate();
	}
</script>

<div class="flex h-full flex-col">
	<div class="mb-1 flex items-center p-2">
		<div class="flex items-center gap-2">
			<Tooltip.Root>
				<Tooltip.Trigger
					id="archive_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!workout}
				>
					<Archive class="size-4" />
					<span class="sr-only">Archive</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Archive</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger
					id="move_to_junk_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!workout}
				>
					<ArchiveX class="size-4" />
					<span class="sr-only">Move to junk</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Move to junk</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger
					id="move_to_trash_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!workout}
				>
					<Trash2 class="size-4" />
					<span class="sr-only">Move to trash</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Move to trash</Tooltip.Content>
			</Tooltip.Root>
			<Separator orientation="vertical" class="mx-1 h-6" />
			<Tooltip.Root>
				<Popover.Root>
					<!-- <Tooltip.Trigger asChild let:builder={tooltip_builder} id="snooze_popover">
						<Popover.Trigger asChild let:builder={popover_builder} id="snooze_popover"> -->
					<Tooltip.Trigger id="snooze_popover">
						<Popover.Trigger id="snooze_popover">
							<!-- <Button
								builders={[tooltip_builder, popover_builder]}
								variant="ghost"
								size="icon"
								disabled={!workout}
							> -->
							<Button variant="ghost" size="icon" disabled={!workout}>
								<Clock class="size-4" />
								<span class="sr-only">Snooze</span>
							</Button>
						</Popover.Trigger>
					</Tooltip.Trigger>
					<Popover.Content class="flex w-[535px] p-0">
						<div class="flex flex-col gap-2 border-r px-2 py-4">
							<div class="px-4 text-sm font-medium">Snooze until</div>
							<div class="grid min-w-[250px] gap-1">
								<Button variant="ghost" class="justify-start font-normal">
									Later today
									<span class="ml-auto text-muted-foreground">
										{relativeFormatter.format(todayDate.add({ hours: 4 }).toDate())}
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									Tomorrow
									<span class="ml-auto text-muted-foreground">
										{relativeFormatter.format(todayDate.add({ days: 1 }).toDate())}
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									This weekend
									<span class="ml-auto text-muted-foreground">
										{relativeFormatter.format(getClosestWeekend())}
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									Next week
									<span class="ml-auto text-muted-foreground">
										{relativeFormatter.format(todayDate.add({ weeks: 1 }).toDate())}
									</span>
								</Button>
							</div>
						</div>
						<!-- <div class="p-2">
							<Calendar bind:value={todayDate} initialFocus />
						</div> -->
					</Popover.Content>
				</Popover.Root>
				<Tooltip.Content>Snooze</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<div class="ml-auto flex items-center gap-2">
			<Tooltip.Root>
				<Tooltip.Trigger
					id="reply_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!workout}
				>
					<Reply class="size-4" />
					<span class="sr-only">Reply</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Reply</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger
					id="reply_all_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!workout}
				>
					<ReplyAll class="size-4" />
					<span class="sr-only">Reply all</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Reply all</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger
					id="forward_tooltip"
					class={buttonVariants({ variant: 'ghost', size: 'icon' })}
					disabled={!workout}
				>
					<Forward class="size-4" />
					<span class="sr-only">Forward</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Forward</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<Separator orientation="vertical" class="mx-2 h-6" />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				id="more_options_dropdown"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
				disabled={!workout}
			>
				<EllipsisVertical class="size-4" />
				<span class="sr-only">More</span>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item>Mark as unread</DropdownMenu.Item>
				<DropdownMenu.Item>Star thread</DropdownMenu.Item>
				<DropdownMenu.Item>Add label</DropdownMenu.Item>
				<DropdownMenu.Item>Mute thread</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<Separator />
	{#if workout}
		<WorkoutCard />
	{:else}
		<div class="p-8 text-center text-muted-foreground">No workout selected</div>
	{/if}
</div>
