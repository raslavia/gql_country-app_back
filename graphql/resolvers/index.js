const postsResolvers = require("./posts");
const userssResolvers = require("./users");
const coommentsResolvers = require("./comments");
const countriesResolvers = require("./countries");

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...countriesResolvers.Query,
  },
  Mutation: {
    ...userssResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...coommentsResolvers.Mutation,
    ...countriesResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
