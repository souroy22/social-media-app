const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../models/postModel");

const canModifyPost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new UserInputError("No such post found!");
  }
  if (post.user.toString() !== userId) {
    throw new AuthenticationError("Error", {
      errors: { UnAuthorized: "Action not allowed" },
    });
  }
  return post;
};

module.exports = { canModifyPost };
