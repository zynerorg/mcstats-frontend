import { defineNuxtPlugin } from "#app";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { provideApolloClient } from "@vue/apollo-composable";

export default defineNuxtPlugin((_) => {
  const config = useRuntimeConfig();

  const httpLink = new HttpLink({
    uri: `${config.public.API_URL}/graphql`,
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          items: offsetLimitPagination(),
        },
      },
    },
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  });

  provideApolloClient(apolloClient);

  return {
    provide: {
      apolloClient,
    },
  };
});
