import {typeDefs} from './src/typeDefs';
import {resolvers} from './src/resolvers';

const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const PORT = 4000;
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({app})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})