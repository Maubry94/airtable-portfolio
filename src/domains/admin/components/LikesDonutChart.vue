<script setup lang="ts">
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";
import { type TooltipItem, Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CHART_CONFIG = {
	LIKES: {
		INITIAL_COUNT: 0,
	},
	COLORS: {
		MIN_VALUE: 55,
		MAX_VALUE: 200,
		BORDER: "#ffffff",
		BORDER_WIDTH: 2,
		HOVER_OFFSET: 10,
	},
	TOOLTIP: {
		PERCENTAGE_MULTIPLIER: 100,
		DEFAULT_VALUE: 0,
		DATASET_INDEX: 0,
		INITIAL_SUM: 0,
	},
};

const props = defineProps<{
	likes: {
		id: string;
		createdTime: string;
		fields: {
			project: string[];
			projectTitle: string[];
			likesCount: number;
			projectStatus: string[];
		};
	}[];
}>();

const chartData = computed(() => {
	const projectLikes = new Map();

	props.likes.forEach((like) => {
		const [projectTitle] = like.fields.projectTitle;
		const currentCount = projectLikes.get(projectTitle) || CHART_CONFIG.LIKES.INITIAL_COUNT;
		projectLikes.set(projectTitle, currentCount + like.fields.likesCount);
	});

	function generateRandomColor() {
		const { MIN_VALUE, MAX_VALUE } = CHART_CONFIG.COLORS;

		const red = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE;
		const green = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE;
		const blue = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE;

		return `rgb(${red}, ${green}, ${blue})`;
	}

	const backgroundColors = Array.from(projectLikes.keys()).map(() => generateRandomColor());

	return {
		labels: Array.from(projectLikes.keys()),
		datasets: [
			{
				data: Array.from(projectLikes.values()),
				backgroundColor: backgroundColors,
				borderWidth: CHART_CONFIG.COLORS.BORDER_WIDTH,
				borderColor: CHART_CONFIG.COLORS.BORDER,
				hoverOffset: CHART_CONFIG.COLORS.HOVER_OFFSET,
			},
		],
	};
});

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "bottom" as const,
			labels: {
				padding: 20,
				font: {
					size: 12,
				},
			},
		},
		title: {
			display: true,
			text: "Répartition des likes par projet",
			font: {
				size: 16,
			},
			padding: {
				top: 10,
				bottom: 20,
			},
		},
		tooltip: {
			callbacks: {
				label: (context: TooltipItem<"doughnut">) => {
					const { PERCENTAGE_MULTIPLIER, DEFAULT_VALUE, DATASET_INDEX, INITIAL_SUM } = CHART_CONFIG.TOOLTIP;

					const label = context.label || "";
					const value = context.raw as number || DEFAULT_VALUE;
					const total = (context.chart.data.datasets[DATASET_INDEX].data as number[])
						.reduce((first: number, second: number) => first + second, INITIAL_SUM);
					const percentage = Math.round((value / total) * PERCENTAGE_MULTIPLIER);
					return `${label}: ${value} likes (${percentage}%)`;
				},
			},
		},
	},
};
</script>

<template>
  <div class="chart-container max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
      :height="300"
    />
  </div>
</template>
