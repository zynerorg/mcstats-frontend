import { gql } from "@apollo/client";
import { useQuery } from "@vue/apollo-composable";
import type { CategoryQuery } from "~~/types/graphql";

const GET_CATEGORIES = gql`
  query Category {
    categories
  }
`;

export const useCategories = () => {
  const { result, loading, error } = useQuery<CategoryQuery>(GET_CATEGORIES);

  return {
    result,
    loading,
    error,
  };
};
