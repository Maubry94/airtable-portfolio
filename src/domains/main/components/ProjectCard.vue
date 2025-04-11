<script setup lang="ts">
import type { Project } from "@/schemas/project";
import { routerPageName } from "@/router/routerPageName";
import { TheCard, CardContent } from "@/components/ui/card";
import TheButton from "@/components/ui/button/TheButton.vue";

defineProps<{
	project: Project;
}>();

const { PROJECT_DETAIL_PAGE } = routerPageName;
</script>

<template>
  <TheCard
    class="
            py-0 overflow-hidden rounded-2xl shadow-md bg-white border border-gray-200
            transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1
          "
  >
    <img
      :src="project.fields.image?.[0]?.url"
      :alt="project.fields.title"
      class="w-full h-48 object-cover"
    >
    <CardContent class="p-6 flex flex-col justify-between h-full">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          {{ project.fields.title }}
        </h2>
        <p class="text-sm text-gray-600 mb-4 line-clamp-3">
          {{ project.fields.summary.value }}
        </p>
        <p class="text-sm text-gray-500 mb-2">
          <span class="font-semibold">👥 Étudiants :</span> {{ project.fields.studentNames.join(', ') }}
        </p>
        <p class="text-sm text-gray-500 mb-4">
          <span class="font-semibold">🔧 Tech :</span> {{ project.fields.technologyNames.join(', ') }}
        </p>
      </div>
      <div class="flex items-center justify-between mt-auto">
        <TheButton
          as-child
          variant="outline"
          size="sm"
        >
          <RouterLink
            :to="{ name: PROJECT_DETAIL_PAGE, params: { id: project.id } }"
          >
            Voir plus
          </RouterLink>
        </TheButton>
        <span class="text-sm text-gray-600">
          ❤️ {{ project.fields.nbLikes }}
        </span>
      </div>
    </CardContent>
  </TheCard>
</template>
