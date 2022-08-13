const { UserInputError } = require("apollo-server");
const Post = require("../../models/postModel");
const { isLoggedIn, isAuthenticated } = require("../../utils/authValidation");
const { canModifyPost } = require("../../utils/postValidation");

const postResolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find()
          .sort({ updatedAt: -1 })
          .populate("comments likes");
        return posts;
      } catch (error) {
        console.log(`Error while getting all posts, Error: ${error.message}`);
      }
    },
  },
  Mutation: {
    async createPost(parent, args, context, info) {
      const user = isLoggedIn(context);
      const { userId, body } = args.post;
      isAuthenticated(user.id, userId);
      let newPost = new Post({
        body,
        user: userId,
      });
      newPost = await newPost.save();
      context.pubsub.publish("NEW_POST", {
        newPost: newPost,
      });
      return newPost;
    },
    async deletePost(parent, args, context, info) {
      const user = isLoggedIn(context);
      const { userId, postId } = args;
      await isAuthenticated(user.id, userId);
      const post = await canModifyPost(postId, userId);
      await post.delete();
      return "Post deleted successfully";
    },
    async addComment(parent, args, context, info) {
      const user = isLoggedIn(context);
      const { postId, userId, comment } = args;
      await isAuthenticated(user.id, userId);
      const post = await Post.findById(postId);
      if (!post) {
        throw new UserInputError("No such post found!");
      }
      post.comments.unshift({
        comment,
        user: user.id,
        commentedAt: new Date().toISOString(),
      });
      await post.save();
      return post;
    },
    async deleteComment(parent, args, context, info) {},
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};

module.exports = postResolvers;
