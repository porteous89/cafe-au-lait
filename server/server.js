const { createServer } = require("http");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { PubSub } = require("graphql-subscriptions");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { typeDefs, resolvers } = require("./schemas");

const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const paymentRoutes = require("./routes/api/payments");

const PORT = parseInt(process.env.PORT) || 3001; //? process.env.PORT: 3001;
const pubsub = new PubSub();

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
  server: httpServer,
});

const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
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
  subscriptions: {
    onConnect: () => console.log("Connected to websocket"),
  },
  context: authMiddleware,
});
// await server.start();
// server.applyMiddleware({ app });
//if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
//}

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  // server.installSubscriptionHandlers(app);
  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);

// Now that our HTTP server is fully set up, actually listen.
