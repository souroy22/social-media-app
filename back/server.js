require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { createServer } = require("http");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const cors = require("cors");
const connectToDatabase = require("./db/database");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { execute, subscribe } = require("graphql");

const PORT = process.env.PORT || 5000;

connectToDatabase();
(async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = createServer(app);
  // Required logic for integrating with Express
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const pubsub = new PubSub();

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, pubsub }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
      // Providing `onConnect` is the `SubscriptionServer` equivalent to the
      // `context` function in `ApolloServer`. Please [see the docs](https://github.com/apollographql/subscriptions-transport-ws#constructoroptions-socketoptions--socketserver)
      // for more information on this hook.
      async onConnect(connectionParams, webSocket, context) {
        console.log("Successfully connected to websocket");
        // If an object is returned here, it will be passed as the `context`
        // argument to your subscription resolvers.
        return {
          pubsub,
        };
      },
      onDisconnect(webSocket, context) {
        console.log("Disconnected!");
      },
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: server.graphqlPath,
    }
  );

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
})(typeDefs, resolvers);
