<script setup lang="ts">
import { projectSchema } from "@/schemas/project";
import { useGetAirtableData } from "@/composables/useGetAirtableData";
import ProjectCard from "@/domains/main/components/ProjectCard.vue";

const {
	isLoading,
	airtableData: projects,
} = useGetAirtableData("Project", projectSchema.array());
</script>

<template>
  <section class="min-h-screen-nh">
    <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-10">
      Liste des projets
    </h1>

    <template v-if="isLoading">
      Chargement des projets...
    </template>

    <template v-else>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </template>
  </section>
</template>
