import { ref, watch, onMounted, computed, type Ref } from "vue";

export interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "input";
  items?: unknown[];
  accessorKey?: string;
  valueKey?: string;
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
  t?: (key: string) => string;
}

function normalizeItems(filter: FilterConfig) {
  if (!filter.items) return [];

  return filter.items.map((item) => {
    if (typeof item === "object" && item !== null) {
      const obj = item as Record<string, unknown>;

      const label = filter.accessorKey
        ? obj[filter.accessorKey]
        : (obj.label ?? obj.name ?? obj);

      const value = filter.valueKey ? obj[filter.valueKey] : item;

      return { label: String(label), value };
    }

    return {
      label: String(item),
      value: item,
    };
  });
}

export function useDataTable<T>(options: FetchOptions<T>) {
  const { filters, onFetch, onTransform, t } = options;

  const page = ref(1);
  const data = ref<T[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const maxPage = ref(1000);

  let requestId = 0;

  function getLabel(filter: FilterConfig) {
    if (t && filter.label.startsWith("filters.")) {
      return t(filter.label);
    }
    return filter.label;
  }

  const normalizedFilters = computed(() =>
    filters.map((f) => ({
      ...f,
      items: normalizeItems(f),
      label: getLabel(f),
    })),
  );

  async function fetchData() {
    const id = ++requestId;
    isLoading.value = true;
    error.value = null;

    try {
      const filterValues = normalizedFilters.value.reduce(
        (acc, filter) => {
          acc[filter.key] = filter.modelValue.value;
          return acc;
        },
        {} as Record<string, unknown>,
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
    filters: normalizedFilters,
    refetch: fetchData,
  };
}
