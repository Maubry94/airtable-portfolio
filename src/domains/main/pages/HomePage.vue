<script setup lang="ts">
import { projectSchema } from "@/schemas/project";
import { useGetAirtableData } from "@/composables/useGetAirtableData";
import TheButton from "@/components/ui/button/TheButton.vue";

const {
	airtableData,
	getAirtableData,
} = useGetAirtableData("Project", projectSchema.array());

function click() {
	getAirtableData();
}
</script>

<template>
  <div>
    <h1 class="text-red-500">
      Portfolio created with Airtable.
    </h1>

    <div
      v-for="(project, index) in airtableData"
      :key="index"
    >
      <p>{{ project.fields.description }}</p>
    </div>

    <TheButton @click="click">
      Click me!
    </TheButton>
  </div>
</template>
