<script setup lang="ts">
import { computed } from "vue";

const TABLE_CONFIG = {
	LIKES: {
		INITIAL_COUNT: 0,
	},
	CALCULATION: {
		INITIAL_SUM: 0,
		PERCENTAGE_FACTOR: 100,
		DECIMAL_PLACES: 1,
	},
};

const props = defineProps<{
	likes: {
		id: string;
		fields: {
			project: string[];
			projectTitle: string[];
			likesCount: number;
			projectStatus: string[];
		};
	}[];
}>();

const likesData = computed(() => {
	const projectLikes = new Map();

	props.likes.forEach((like) => {
		const [projectTitle] = like.fields.projectTitle;
		const currentCount = projectLikes.get(projectTitle) || TABLE_CONFIG.LIKES.INITIAL_COUNT;
		projectLikes.set(projectTitle, currentCount + like.fields.likesCount);
	});

	const { INITIAL_SUM, PERCENTAGE_FACTOR, DECIMAL_PLACES } = TABLE_CONFIG.CALCULATION;
	const totalLikes = Array.from(projectLikes.values()).reduce((sum, count) => sum + count, INITIAL_SUM);

	return Array.from(projectLikes.entries())
		.map(([title, count]) => ({
			title,
			count,
			percentage: ((count / totalLikes) * PERCENTAGE_FACTOR).toFixed(DECIMAL_PLACES),
		}))
		.sort((first, second) => second.count - first.count);
});
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6 mt-8">
    <h3 class="text-xl font-semibold mb-4">
      Détails par projet
    </h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Projet
            </th>
            <th class="px-4 py-3 text-right text-sm font-medium text-gray-500 tracking-wider">
              Nombre de likes
            </th>
            <th class="px-4 py-3 text-right text-sm font-medium text-gray-500 tracking-wider">
              Pourcentage
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="item in likesData"
            :key="item.title"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-3 text-sm text-gray-900">
              {{ item.title }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-900 text-right">
              {{ item.count }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-900 text-right">
              {{ item.percentage }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
