import express  from 'express';
import { GraphQLServer, PubSub } from "graphql-yoga"
import typeDefs from "./app/typeDefs.js"
import resolvers from "./app/resolvers.js"
const pubsub = new PubSub();
import dotenv from "dotenv";
// var orderData = [];
// const user_id = 'asdfsd';
// orderData.user_id = user_id

// console.log(orderData)
dotenv.config();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    pubsub,
  },
});

const options = {
  port: process.env.NODE_LOCAL_PORT,
};

server.start(options, ({ port }) => {
  console.log(
    `Graphql Server started, listening on port ${port} for incoming requests.`
  );
});
