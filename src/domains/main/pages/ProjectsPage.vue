<script setup lang="ts">
import { useGetAirtableData } from "@/composables/useGetAirtableData";
import { projectSchema } from "@/schemas/project";
import { ref, computed } from "vue";
import ProjectCard from "@/domains/main/components/ProjectCard.vue";

const {
	isLoading,
	airtableData: projects,
} = useGetAirtableData("Project", projectSchema.array(), undefined, {
	field: "status",
	value: "Published",
});

const searchQuery = ref("");

const filteredProjects = computed(() => {
	if (!searchQuery.value.trim()) {
		return projects.value;
	}

	const query = searchQuery.value.toLowerCase();
	return projects.value?.filter((project) => {
		if (project.fields.title.toLowerCase().includes(query)) {
			return true;
		}

		if (project.fields.description.toLowerCase().includes(query)) {
			return true;
		}

		if (project.fields.summary.value.toLowerCase().includes(query)) {
			return true;
		}

		if (project.fields.keywords.value.toLowerCase().includes(query)) {
			return true;
		}

		if (project.fields.technologyNames.some((tech) => tech.toLowerCase().includes(query))) {
			return true;
		}

		if (project.fields.studentNames.some((student) => student.toLowerCase().includes(query))) {
			return true;
		}

		return false;
	});
});
</script>

<template>
  <section class="min-h-screen-nh">
    <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-10">
      Liste des projets
    </h1>

    <div class="mb-8 max-w-md mx-auto">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par mots-clés, technologies, étudiants..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:border-transparent"
        >
        <div
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          ✕
        </div>
      </div>
    </div>

    <template v-if="isLoading">
      <div class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-blue-500 border-gray-200" />
        <p class="mt-2 text-gray-600">
          Chargement des projets...
        </p>
      </div>
    </template>

    <template v-else>
      <div
        v-if="filteredProjects && filteredProjects.length > 0"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <div
        v-else
        class="text-center py-12 text-gray-500"
      >
        <p
          v-if="searchQuery"
          class="text-lg"
        >
          Aucun projet ne correspond à votre recherche "{{ searchQuery }}"
        </p>

        <p
          v-else
          class="text-lg"
        >
          Aucun projet publié disponible pour le moment.
        </p>
      </div>
    </template>
  </section>
</template>
