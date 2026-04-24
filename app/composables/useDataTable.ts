import type { Ref } from "vue";

export interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "input";
  items?: unknown[];
  modelValue: Ref<unknown>;
  [key: string]: unknown;
}

interface FetchOptions<T> {
  filters: FilterConfig[];
  onFetch: (
    filters: Record<string, unknown>,
    page: number,
  ) => Promise<{ data: T[] }>;
  onTransform?: (item: T) => Promise<T>;
}

export function useDataTable<T>(options: FetchOptions<T>) {
  const { filters, onFetch, onTransform } = options;

  const page = ref(1);
  const data = ref<T[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const maxPage = ref(1000);

  let requestId = 0;

  async function fetchData() {
    const id = ++requestId;
    isLoading.value = true;
    error.value = null;

    try {
      const filterValues = filters.reduce(
        (acc, filter) => {
          acc[filter.key] = filter.modelValue.value;
          return acc;
        },
        {} as Record<string, any>,
      );

      const res = await onFetch(filterValues, page.value);

      if (id === requestId) {
        if (onTransform) {
          data.value = await Promise.all(res.data.map(onTransform));
        } else {
          data.value = res.data;
        }
      }
    } catch (e) {
      if (id === requestId) {
        error.value = e instanceof Error ? e.message : "Failed to fetch data";
      }
    } finally {
      if (id === requestId) {
        isLoading.value = false;
      }
    }
  }

  const filterRefs = filters.map((f) => f.modelValue);
  watch([...filterRefs, page], fetchData);

  onMounted(fetchData);

  return {
    data,
    page,
    maxPage,
    isLoading,
    error,
    filters,
    refetch: fetchData,
  };
}
