import { gql } from "@apollo/client";
import { useQuery } from "@vue/apollo-composable";
import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";
import type { Filter } from "~~/types/filter";
import type { StatsFilterInput, StatsQuery } from "~~/types/graphql";
import { nameToUuid } from "~/utils/names";

const GET_STATS = gql`
  query Stats($filter: StatsFilterInput) {
    stats(filter: $filter) {
      playerUuid
      category
      valueName
      value
    }
  }
`;

export const useData = (filters: MaybeRefOrGetter<Filter[]>) => {
  const page = ref(1);
  const playerUuid = ref<string | null>(null);

  const filtersRef = computed(() => toValue(filters));

  const filterValues = computed(() => {
    const values: Record<string, any> = {};
    for (const f of filtersRef.value) {
      let value = f.modelValue.value;
      if (value && typeof value === "object") {
        value = (value as any).value ?? (value as any).id ?? value;
      }
      const skipValues = [null, undefined, "", -1, "None"];
      if (skipValues.includes(value)) {
        continue;
      }
      values[f.key] = value;
    }
    return values;
  });

  // Watch filter values and resolve player name to UUID
  watch(
    () => filterValues.value.playerUuid,
    async (newPlayerUuid) => {
      if (newPlayerUuid && !newPlayerUuid.includes("-")) {
        playerUuid.value = await nameToUuid(newPlayerUuid);
      } else if (newPlayerUuid && newPlayerUuid.includes("-")) {
        playerUuid.value = newPlayerUuid;
      } else {
        playerUuid.value = null;
      }
    },
    { immediate: true },
  );

  const variables = computed((): { filter: StatsFilterInput } => {
    const filter: StatsFilterInput = {
      limit: 25,
      offset: (page.value - 1) * 25,
    };

    // Add non-player filters
    for (const [key, value] of Object.entries(filterValues.value)) {
      if (key !== "playerUuid") {
        (filter as any)[key] = value;
      }
    }

    // Add resolved player UUID
    if (playerUuid.value) {
      filter.playerUuid = playerUuid.value;
    }

    return { filter };
  });

  const { result, loading, error, refetch } = useQuery<StatsQuery>(
    GET_STATS,
    variables,
    { fetchPolicy: "network-only" },
  );

  const tableData = computed(() => result.value?.stats ?? []);

  watch(
    filterValues,
    () => {
      page.value = 1;
      refetch();
    },
    { deep: true },
  );

  // Also refetch when playerUuid resolves
  watch(playerUuid, () => {
    refetch();
  });

  return {
    tableData,
    loading,
    error,
    page,
    refetch,
  };
};