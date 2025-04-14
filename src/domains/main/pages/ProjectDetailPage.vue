<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { routerPageName } from "@/router/routerPageName";
import { projectSchema } from "@/schemas/project";
import { useGetAirtableData } from "@/composables/useGetAirtableData";
import { z } from "zod";
import { TheButton } from "@/components/ui/button";

const params = useRouteParams({
	id: z.string(),
});

const { PROJECTS_PAGE } = routerPageName;

const {
	isLoading,
	airtableData: project,
} = useGetAirtableData("Project", projectSchema, params.value.id);
</script>

<template>
  <section class="min-h-screen bg-gradient-to-br from-blue-100 to-white p-8">
    <div class="max-w-4xl mx-auto">
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

        <span class="text-sm text-gray-600">
          ❤️ {{ project.fields.nbLikes }} likes
        </span>
      </div>
    </div>
  </section>
</template>
