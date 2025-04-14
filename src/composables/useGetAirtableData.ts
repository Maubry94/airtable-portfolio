import { ref } from "vue";
import { type z, type ZodType } from "zod";
import api from "../lib/axios";

interface ApiResponseList {
	records: {
		id: string;
		fields: Record<string, unknown>;
		createdTime: string;
	}[];
}
interface ApiResponseSingle {
	id: string;
	fields: Record<string, unknown>;
	createdTime: string;
}

type Table = "Project" | "Student" | "Technology" | "Like";

interface FilterOptions {
	field?: string;
	value?: string | number | boolean;
}

export function useGetAirtableData<
	GenericZodType extends ZodType = ZodType,
>(
	tableName: Table,
	zodSchema: GenericZodType,
	id?: string,
	filterOptions?: FilterOptions,
) {
	const isLoading = ref(false);
	const airtableData = ref<z.infer<GenericZodType>>([]);

	function getAirtableData() {
		isLoading.value = true;

		if (id) {
			api.get<ApiResponseSingle>(`${tableName}/${id}`)
				.then((response) => {
					const jsonMapped = {
						id: response.data.id,
						createdTime: response.data.createdTime,
						fields: response.data.fields,
					};

					const { success, data, error } = zodSchema.safeParse(jsonMapped);

					if (!success) {
						throw new Error(error.errors.shift()!.message);
					}

					airtableData.value = <never>data;
				})
				.catch((error: unknown) => {
					if (error instanceof Error) {
						throw new Error(`Error while fetching data: ${error.message}`);
					}
					throw error;
				})
				.finally(() => {
					isLoading.value = false;
				});
		} else {
			const params: Record<string, string> = {};

			if (filterOptions?.field && filterOptions?.value !== undefined) {
				params.filterByFormula = `${filterOptions.field}="${filterOptions.value}"`;
			}

			api.get<ApiResponseList>(tableName, { params })
				.then((response) => {
					const jsonMapped = response.data.records.map(
						(input) => ({
							id: input.id,
							createdTime: input.createdTime,
							fields: input.fields,
						}),
					);

					const { success, data, error } = zodSchema.safeParse(jsonMapped);

					if (!success) {
						throw new Error(error.errors.shift()!.message);
					}

					airtableData.value = <never>data;
				})
				.catch((error: unknown) => {
					if (error instanceof Error) {
						throw new Error(`Error while fetching data: ${error.message}`);
					}
					throw error;
				})
				.finally(() => {
					isLoading.value = false;
				});
		}
	}

	getAirtableData();

	return {
		isLoading,
		airtableData,
		getAirtableData,
	};
}
