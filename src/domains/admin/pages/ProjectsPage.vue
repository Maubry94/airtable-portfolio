<script setup lang="ts">
import { useGetAirtableData } from "@/composables/useGetAirtableData";
import { projectSchema, type Project } from "@/schemas/project";
import {
	type ColumnFiltersState,
	type ExpandedState,
	type SortingState,
	type VisibilityState,
	createColumnHelper,
	FlexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useVueTable,
} from "@tanstack/vue-table";
import { valueUpdater } from "@/lib/utils";
import { TheButton } from "@/components/ui/button";
import { TheInput } from "@/components/ui/input";
import {
	TheTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-vue-next";
import { h, ref } from "vue";
import DropdownAction from "../components/DropdownAction.vue";

const {
	isLoading,
	airtableData: projects,
} = useGetAirtableData("Project", projectSchema.array());

const columnHelper = createColumnHelper<Project>();

const columns = [
	columnHelper.accessor((row) => row.fields.title, {
		id: "title",
		header: ({ column }) => h(TheButton, {
			variant: "ghost",
			onClick: () => void column.toggleSorting(column.getIsSorted() === "asc"),
		}, () => ["Titre", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]),
		cell: ({ row }) => h("div", { class: "" }, row.getValue("title")),
		enableSorting: true,
		enablePinning: true,
	}),
	columnHelper.accessor((row) => row.fields.description, {
		id: "description",
		header: ({ column }) => h(TheButton, {
			variant: "ghost",
			onClick: () => void column.toggleSorting(column.getIsSorted() === "asc"),
		}, () => ["Description", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]),
		cell: ({ row }) => h("div", {
			class: "max-w-[300px] truncate",
			title: row.getValue("description"),
		}, row.getValue("description")),
		enableSorting: true,
		enablePinning: true,
	}),
	columnHelper.accessor((row) => row.fields.status, {
		id: "status",
		header: ({ column }) => h(TheButton, {
			variant: "ghost",
			onClick: () => void column.toggleSorting(column.getIsSorted() === "asc"),
		}, () => ["Status", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]),
		cell: ({ row }) => h("div", { class: "" }, row.getValue("status")),
		enableSorting: true,
		enablePinning: true,
	}),
	columnHelper.display({
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const project = row.original;

			return h("div", { class: "relative" }, h(DropdownAction, {
				project,
			}));
		},
	}),
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
	data: projects,
	columns,
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getExpandedRowModel: getExpandedRowModel(),
	onSortingChange: (updaterOrValue) => void valueUpdater(updaterOrValue, sorting),
	onColumnFiltersChange: (updaterOrValue) => void valueUpdater(updaterOrValue, columnFilters),
	onColumnVisibilityChange: (updaterOrValue) => void valueUpdater(updaterOrValue, columnVisibility),
	state: {
		get sorting() {
			return sorting.value;
		},
		get columnFilters() {
			return columnFilters.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
		},
		get expanded() {
			return expanded.value;
		},
	},
});
</script>

<template>
  <section class="min-h-screen-nh">
    <h1 class="text-2xl font-bold mb-4">
      Gestion des projets
    </h1>

    <template v-if="isLoading">
      <div class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-blue-500 border-gray-200" />
        <p class="mt-2 text-gray-600">
          Chargement des projets...
        </p>
      </div>
    </template>

    <template v-else>
      <div class="w-full p-4 bg-white rounded-md border">
        <div class="flex gap-2 items-center py-4">
          <TheInput
            class="max-w-sm"
            placeholder="Filtrer par titre..."
            :model-value="table.getColumn('title')?.getFilterValue() as string"
            @update:model-value=" table.getColumn('title')?.setFilterValue($event)"
          />
        </div>
        <div class="rounded-md border">
          <TheTable>
            <TableHeader>
              <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                >
                  <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="table.getRowModel().rows?.length">
                <template
                  v-for="row in table.getRowModel().rows"
                  :key="row.id"
                >
                  <TableRow>
                    <TableCell
                      v-for="cell in row.getVisibleCells()"
                      :key="cell.id"
                    >
                      <FlexRender
                        :render="cell.column.columnDef.cell"
                        :props="cell.getContext()"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow v-if="row.getIsExpanded()">
                    <TableCell :colspan="row.getAllCells().length">
                      {{ JSON.stringify(row.original) }}
                    </TableCell>
                  </TableRow>
                </template>
              </template>

              <TableRow v-else>
                <TableCell
                  :colspan="columns.length"
                  class="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            </TableBody>
          </TheTable>
        </div>

        <div class="flex items-center justify-end space-x-2 py-4">
          <div class="space-x-2">
            <TheButton
              variant="outline"
              size="sm"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            >
              Précédent
            </TheButton>
            <TheButton
              variant="outline"
              size="sm"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            >
              Suivant
            </TheButton>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
