const {gql} = require("apollo-server");
//can export from apollo-server

module.exports = gql`
  enum Continent {
    ASIA
    EUROPE
    AUSTRALIA
    AFRICA
    NORTH_AMERICA
    SOUTH_AMERICA
  }
  type Country {
    id: ID!
    imgUrl: String
    name: String!
    capital: String!
    continent: Continent!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Post {
    id: ID
    body: String!
    createdAt: String
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int
    commentCount: Int
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    age: String
    createdAt: String!
    visited: [Country]!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    age: String
  }
  input CountryInput {
    name: String!
    capital: String!
    continent: String!
    imgUrl: String!
  }
  type Query {
    getUser(id: ID!): User
    getPosts: [Post]!
    getPost(postId: ID!): Post
    getCountries: [Country]!
    getCountry(id: ID!): Country
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addCountry(userId: ID!, countryId: ID!): User!
    createCountry(countryInput: CountryInput): [Country]!
    updateCountry(id: ID!, imgUrl: String!): [Country]!
    deleteCountry(id: ID!): [Country]!
  }
`;
