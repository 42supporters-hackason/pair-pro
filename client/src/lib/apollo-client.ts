import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { differenceInMinutes } from "date-fns";
import { createClient } from "graphql-ws";
import { sessionTimestampStorage } from "../utils/local-storage/timestamp";
import { tokenStorage } from "../utils/local-storage/token";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_URI,
  })
);

const authLink = setContext((_, { headers }) => {
  const session = sessionTimestampStorage.load();
  if (session !== null) {
    const lastUsedInterval = differenceInMinutes(new Date(), session);
    if (lastUsedInterval >= 1) {
      tokenStorage.clear();
      localStorage.clear();
      return;
    }
  }
  const token = tokenStorage.load();
  sessionTimestampStorage.save(new Date());

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
