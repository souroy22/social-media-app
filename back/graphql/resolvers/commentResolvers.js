const { UserInputError } = require("apollo-server");
const Post = require("../../models/postModel");
const Comment = require("../../models/commentModel");
const { isLoggedIn, isAuthenticated } = require("../../utils/authValidation");
const { canModifyPost } = require("../../utils/postValidation");
const { canModifyComment } = require("../../utils/commentValidation");


const postResolvers = {
     Query: {
          
     },
     Mutation: {
          async addComment(parent, args, context, info) {
               const user = isLoggedIn(context);
               const {postId, userId, comment} = args;
               await isAuthenticated(user.id, userId);
               const post = await Post.findById(postId);
               if(!post){
                    throw new UserInputError("No such post found!");
               }
               let newComment = new Comment({
                    text: comment,
                    commentedBy: user.id
               });
               newComment = await newComment.save();
               post.comments.unshift(newComment._id);
               await post.save();
               const updatedPost = await post.populate("comments");
               return updatedPost;
          },
          async deleteComment(parent, args, context, info) {
               const user = isLoggedIn(context);
               const {postId, commentId, userId} = args;
               await isAuthenticated(user.id, userId);
               let post = await Post.findById(postId);
               if(!post){
                    throw new UserInputError("No such post found!");
               }
               const comment = await canModifyComment(commentId, userId);
               await comment.delete();
               post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
               await post.save();
               return "Comment deleted successfully";
          }
     }
};

module.exports = postResolvers;