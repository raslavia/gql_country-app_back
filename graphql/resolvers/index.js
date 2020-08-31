const postsResolvers = require("./posts");
const userssResolvers = require("./users");
const coommentsResolvers = require("./comments");
const countriesResolvers = require("./countries");

module.exports = {
  Post: {
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length,
  },
  Query: {
    ...userssResolvers.Query,
    ...postsResolvers.Query,
    ...countriesResolvers.Query,
  },
  Mutation: {
    ...userssResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...coommentsResolvers.Mutation,
    ...countriesResolvers.Mutation,
  },
};
