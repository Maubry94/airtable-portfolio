import { ref } from "vue";
import { type z, type ZodType } from "zod";
import api from "../lib/axios";

interface ApiResponse {
	records: {
		id: string;
		fields: Record<string, unknown>;
		createdTime: string;
	}[];
}

type Table = "Project" | "Student" | "Technology" | "Like";

export function useGetAirtableData<
	GenericZodType extends ZodType = ZodType,
>(
	tableName: Table,
	zodSchema: GenericZodType,
) {
	const isLoading = ref(false);
	const airtableData = ref<z.infer<GenericZodType>>([]);

	function getAirtableData() {
		isLoading.value = true;

		api.get<ApiResponse>(tableName)
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

	return {
		isLoading,
		airtableData,
		getAirtableData,
	};
}
