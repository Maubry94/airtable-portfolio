<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { useUpdateProjectStatus } from "../composables/useUpdateProjectStatus";
import { TheButton } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-vue-next";

const props = defineProps<{
	project: {
		id: string;
		fields: {
			status: string;
		};
	};
}>();

const { PROJECT_DETAIL_PAGE } = routerPageName;
const { updateProjectStatus } = useUpdateProjectStatus();

function copy(id: string) {
	navigator.clipboard.writeText(id).catch((error: unknown) => {
		console.error("Failed to copy text to clipboard:", error);
	});
}

function toggleStatus() {
	updateProjectStatus(props.project.id, props.project.fields.status);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <TheButton
        variant="ghost"
        class="w-8 h-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </TheButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        class="cursor-pointer"
        @click="copy(project.id)"
      >
        Copier l'ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <RouterLink
          :to="{ name: PROJECT_DETAIL_PAGE, params: { id: project.id } }"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir le projet
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuItem
        class="cursor-pointer"
        @click="toggleStatus"
      >
        {{ project.fields.status === "Published" ? "Dépublier" : "Publier" }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
