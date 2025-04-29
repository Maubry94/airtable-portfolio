<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TheSkeleton } from "@/components/ui/skeleton";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<{
	showIcon?: boolean;
	class?: HTMLAttributes["class"];
}>();

const WIDTH_CONFIG = {
	RANDOM_WIDTH_RANGE: 40,
	BASE_WIDTH: 50,
};

const width = computed(() => `${Math.floor(Math.random() * WIDTH_CONFIG.RANDOM_WIDTH_RANGE) + WIDTH_CONFIG.BASE_WIDTH}%`);
</script>

<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    :class="cn('flex h-8 items-center gap-2 rounded-md px-2', props.class)"
  >
    <TheSkeleton
      v-if="showIcon"
      class="size-4 rounded-md"
      data-sidebar="menu-skeleton-icon"
    />

    <Skeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
