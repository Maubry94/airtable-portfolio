<script setup lang="ts">
import { TheTooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type Component, computed } from "vue";
import SidebarMenuButtonChild, { type SidebarMenuButtonProps } from "./SidebarMenuButtonChild.vue";
import { useSidebar } from "./utils";
import { SheetClose } from "../sheet";

defineOptions({
	inheritAttrs: false,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-redundant-type-constituents
const props = withDefaults(defineProps<SidebarMenuButtonProps & {
	tooltip?: string | Component;
}>(), {
	as: "button",
	variant: "default",
	size: "default",
	tooltip: undefined,
});

const { isMobile, state } = useSidebar();

const delegatedProps = computed(() => {
	const { tooltip, ...delegated } = props;
	return delegated;
});
</script>

<template>
  <!-- Version sans tooltip -->
  <template v-if="!tooltip">
    <SheetClose
      v-if="isMobile"
      v-bind="$attrs"
    >
      <SidebarMenuButtonChild v-bind="delegatedProps">
        <slot />
      </SidebarMenuButtonChild>
    </SheetClose>

    <SidebarMenuButtonChild
      v-else
      v-bind="{ ...delegatedProps, ...$attrs }"
    >
      <slot />
    </SidebarMenuButtonChild>
  </template>

  <!-- Version avec tooltip -->
  <TheTooltip v-else>
    <TooltipTrigger as-child>
      <SheetClose
        v-if="isMobile"
        v-bind="$attrs"
      >
        <SidebarMenuButtonChild v-bind="delegatedProps">
          <slot />
        </SidebarMenuButtonChild>
      </SheetClose>

      <SidebarMenuButtonChild
        v-else
        v-bind="{ ...delegatedProps, ...$attrs }"
      >
        <slot />
      </SidebarMenuButtonChild>
    </TooltipTrigger>
    <TooltipContent
      side="right"
      align="center"
      :hidden="state !== 'collapsed' || isMobile"
    >
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component
        :is="tooltip"
        v-else
      />
    </TooltipContent>
  </TheTooltip>
</template>
