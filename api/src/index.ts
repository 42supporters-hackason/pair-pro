// import { ApolloServer } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import { context } from "./context";
import { schema } from "./schema";

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema, context }, wsServer);

const server = new ApolloServer({
  schema,
  context,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault(),
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// top level await causes an error
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(process.env.PORT || 4000, () => {
    console.log(
      `🚀Server is now running on port ${process.env.PORT || 4000}${
        server.graphqlPath
      }`
    );
  });
}

startServer();
