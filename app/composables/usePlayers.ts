import { gql } from "@apollo/client";
import { useQuery } from "@vue/apollo-composable";
import type { PlayerQuery } from "~~/types/graphql";

const GET_PLAYERS = gql`
  query Player {
    players {
      name
    }
  }
`;

export const usePlayers = () => {
  const { result, loading, error } = useQuery<PlayerQuery>(GET_PLAYERS);

  return {
    result,
    loading,
    error,
  };
};
