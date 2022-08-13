const postResolvers = require("./postResolvers");
const userResolvers = require("./userResolvers");
const commentResolvers = require("./commentResolvers");
const likeResolvers = require("./likeResolvers");

const resolvers = {
     Post: {
          likeCount: (parent) => {
               return parent.likes.length;
          },
          commentCount: (parent) => {
               console.log("Parent", parent);
               return parent.comments.length;
          }
     },
     Query: {
          ...postResolvers.Query,
          ...userResolvers.Query,
          ...commentResolvers.Query,
          ...likeResolvers.Query
     },
     Mutation: {
          ...postResolvers.Mutation,
          ...userResolvers.Mutation,
          ...commentResolvers.Mutation,
          ...likeResolvers.Mutation
     },
     Subscription: {
          ...postResolvers.Subscription
     }
};

module.exports = resolvers;