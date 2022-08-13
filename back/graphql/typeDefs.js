const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Comment {
    id: ID!
    text: String!
    commentedBy: ID!
    createdAt: String!
  }

  type Like {
    id: ID!
    expression: String!
    likedBy: ID!
    createdAt: String!
  }

  type Post {
    id: ID!
    body: String!
    comments: [Comment]!
    likes: [Like]!
    commentCount: Int!
    likeCount: Int!
  }

  input SignupFields {
    name: String!
    email: String!
    phone: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  type User {
    id: ID
    name: String!
    email: String!
    phone: String!
    username: String!
  }

  type AuthUser {
    id: ID
    name: String!
    email: String!
    phone: String!
    username: String!
    token: String!
  }

  input NewPost {
    body: String!
    userId: ID!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    # auth Mutations
    signup(signupFields: SignupFields): User!
    login(userIdentity: String!, password: String!): AuthUser!

    # post Mutations
    createPost(post: NewPost!): Post!
    deletePost(postId: ID!, userId: ID!): String!

    # comment Mutations
    addComment(postId: ID!, userId: ID!, comment: String!): Post!
    deleteComment(postId: ID!, commentId: ID!, userId: ID!): String!

    # like Mutations
    addLike(postId: ID!, userId: ID!, expression: String!): Post!
    removeLike(postId: ID!, likeId: ID!, userId: ID!): String!
  }

  type Subscription {
    newPost: Post!
  }
`;

module.exports = typeDefs;
