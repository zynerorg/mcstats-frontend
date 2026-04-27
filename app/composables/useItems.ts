import { gql } from "@apollo/client";
import { useQuery } from "@vue/apollo-composable";
import type { ItemQuery } from "~~/types/graphql";

const GET_ITEMS = gql`
  query Item {
    items
  }
`;

export const useItems = () => {
  const { result, loading, error } = useQuery<ItemQuery>(GET_ITEMS);

  return {
    result,
    loading,
    error,
  };
};