<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { TheInput } from "@/components/ui/input";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <TheInput
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="cn(
      'bg-background h-8 w-full shadow-none',
      props.class,
    )"
  >
    <slot />
  </TheInput>
</template>
