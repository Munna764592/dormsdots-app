import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BACKEND_URI } from "@env";

const client = new ApolloClient({
  uri: BACKEND_URI,
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json"
  },
});

export default client;
