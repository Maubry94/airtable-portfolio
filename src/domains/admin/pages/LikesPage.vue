<script setup lang="ts">
import { useGetAirtableData } from "@/composables/useGetAirtableData";
import { likeSchema } from "@/schemas/like";
import { computed } from "vue";
import LikesDonutChart from "../components/LikesDonutChart.vue";
import LikesTable from "../components/LikesTable.vue";

const PAGE_CONFIG = {
	ARRAY: {
		FIRST_INDEX: 0,
	},
	STATS: {
		DEFAULT_TOTAL: 0,
		DEFAULT_PROJECTS: 0,
	},
};

const {
	isLoading,
	airtableData: likes,
} = useGetAirtableData("Like", likeSchema.array());

const likeStats = computed(() => {
	if (!likes.value || !Array.isArray(likes.value)) {
		return {
			total: PAGE_CONFIG.STATS.DEFAULT_TOTAL,
			projects: PAGE_CONFIG.STATS.DEFAULT_PROJECTS,
		};
	}

	const projectsSet = new Set();
	let totalLikes = PAGE_CONFIG.STATS.DEFAULT_TOTAL;

	likes.value.forEach((like) => {
		const { FIRST_INDEX } = PAGE_CONFIG.ARRAY;
		if (like.fields.projectTitle?.[FIRST_INDEX]) {
			projectsSet.add(like.fields.projectTitle[FIRST_INDEX]);
		}
		totalLikes += like.fields.likesCount;
	});

	return {
		total: totalLikes,
		projects: projectsSet.size,
	};
});
</script>

<template>
  <section class="min-h-screen-nh">
    <h1 class="text-2xl font-bold mb-4">
      Répartitions des likes
    </h1>

    <template v-if="isLoading">
      <div class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-blue-500 border-gray-200" />
        <p class="mt-2 text-gray-600">
          Chargement des données de likes...
        </p>
      </div>
    </template>

    <template v-else-if="likes && likes.length > 0">
      <div class="max-w-4xl mx-auto mb-8">
        <div class="text-center mb-8">
          <p class="text-lg text-gray-600">
            <span class="font-semibold">{{ likeStats.total }}</span> likes au total répartis sur
            <span class="font-semibold">{{ likeStats.projects }}</span> projets
          </p>
        </div>

        <LikesDonutChart :likes="likes" />
        <LikesTable :likes="likes" />
      </div>
    </template>

    <template v-else>
      <div class="text-center py-12 text-gray-500">
        <p class="text-lg">
          Aucun like n'a encore été enregistré.
        </p>
      </div>
    </template>
  </section>
</template>
