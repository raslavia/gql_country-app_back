const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});
//adding "CONTEXT" for later use in relover

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
// server.listen({ port: 5000 }).then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });;
