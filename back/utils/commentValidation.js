const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const canModifyComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new UserInputError("No such comment found!");
  }
  if (comment.commentedBy.toString() !== userId) {
    throw new AuthenticationError("Error", {
      errors: { UnAuthorized: "Action not allowed" },
    });
  }
  return comment;
};

module.exports = { canModifyComment };
