import { gql } from "@apollo/client";
import { useQuery } from "@vue/apollo-composable";
import type { Get_PlayersQuery } from "~~/types/graphql";

const GET_PLAYERS = gql`
  query get_stats {
    stats {
      playerUuid
      category
      valueName
      value
    }
  }
`;

export const usePlayers = () => {
  const { result, loading, error } = useQuery<Get_PlayersQuery>(GET_PLAYERS);

  return {
    players: result,
    playersLoading: loading,
    playersError: error,
  };
};
