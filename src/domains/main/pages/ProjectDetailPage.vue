<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { routerPageName } from "@/router/routerPageName";
import { projectSchema } from "@/schemas/project";
import { useGetAirtableData } from "@/composables/useGetAirtableData";
import { useLikeProject } from "@/composables/useLikeProject";
import { ref, watch } from "vue";
import { TheButton } from "@/components/ui/button";

const params = useRouteParams({
	id: z.string(),
});

const { PROJECTS_PAGE } = routerPageName;

const {
	isLoading,
	airtableData: project,
} = useGetAirtableData("Project", projectSchema, params.value.id);

const DEFAULT_LIKES = 0;
const nbLikes = ref(DEFAULT_LIKES);
const hasLiked = ref(false);

const { addLike, removeLike, hasLikedProject } = useLikeProject();

watch(project, (newProject) => {
	if (newProject?.fields) {
		nbLikes.value = newProject.fields.nbLikes ?? DEFAULT_LIKES;
		hasLiked.value = hasLikedProject(newProject.id);
	}
});

async function toggleLike() {
	const currentProject = project.value;
	if (!currentProject) {
		return;
	}

	if (!hasLiked.value) {
		addLike(currentProject.id);
		hasLiked.value = true;
		nbLikes.value++;
	} else {
		await removeLike(currentProject.fields.title, currentProject.id);
		hasLiked.value = false;
		nbLikes.value--;
	}
}
</script>

<template>
  <section class="min-h-screen bg-gradient-to-br from-blue-100 to-white">
    <div class="max-w-4xl mx-auto">
      <div class="space-y-4">
        <TheButton
          as-child
          variant="outline"
        >
          <RouterLink :to="{ name: PROJECTS_PAGE }">
            ← Retour à la liste des projets
          </RouterLink>
        </TheButton>

        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
          Détails du projet
        </h1>
      </div>

      <div
        v-if="isLoading"
        class="text-center text-gray-500 text-lg mt-40"
      >
        Chargement du projet...
      </div>

      <div v-else>
        <img
          :src="project.fields.image?.[0]?.url"
          :alt="project.fields.title"
          class="w-full h-72 object-cover rounded-2xl shadow mb-8"
        >

        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          {{ project.fields.title }}
        </h2>

        <p class="text-base text-gray-700 mb-6 leading-relaxed">
          {{ project.fields.description }}
        </p>

        <ul class="space-y-2 text-sm text-gray-600 mb-6">
          <li>
            👥 <strong>Étudiants :</strong> {{ project.fields.studentNames.join(', ') }}
          </li>
          <li>
            🧪 <strong>Technologies :</strong> {{ project.fields.technologyNames.join(', ') }}
          </li>
          <li>
            🔍 <strong>Mots-clés :</strong> {{ project.fields.keywords.value }}
          </li>
        </ul>

        <TheButton
          variant="ghost"
          size="sm"
          @click="toggleLike"
          :class="{ 'bg-blue-500 text-white': hasLiked }"
        >
          <span>❤️</span>
          <span class="ml-1 text-sm">{{ nbLikes }} like{{ nbLikes > 1 ? 's' : '' }}</span>
        </TheButton>
      </div>
    </div>
  </section>
</template>
