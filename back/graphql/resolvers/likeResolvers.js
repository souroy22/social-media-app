const { UserInputError } = require("apollo-server");
const Post = require("../../models/postModel");
const Comment = require("../../models/commentModel");
const { isLoggedIn, isAuthenticated } = require("../../utils/authValidation");
const { canModifyPost } = require("../../utils/postValidation");
const { canModifyComment } = require("../../utils/commentValidation");
const Like = require("../../models/likeModel");
const { canModifyLike } = require("../../utils/likeValidation");


const postResolvers = {
     Query: {
          
     },
     Mutation: {
          async addLike(parent, args, context, info) {
               const user = isLoggedIn(context);
               const {postId, userId, expression} = args;
               await isAuthenticated(user.id, userId);
               const post = await Post.findById(postId);
               if(!post){
                    throw new UserInputError("No such post found!");
               }
               const isAlreadyLiked = await Like.find({postId, likedBy: user.id});
               if(isAlreadyLiked.length){
                    throw new UserInputError(`You already liked this post`);
               }
               let newLike = new Like({
                    expression: (expression && expression.trim() !== "") ? expression : "LIKE",
                    likedBy: user.id,
                    postId
               });
               newLike = await newLike.save();
               post.likes.unshift(newLike._id);
               await post.save();
               const updatedPost = await post.populate("comments likes");
               return updatedPost;
          },
          async removeLike(parent, args, context, info) {
               const user = isLoggedIn(context);
               const {postId, userId, likeId} = args;
               await isAuthenticated(user.id, userId);
               let post = await Post.findById(postId);
               if(!post){
                    throw new UserInputError("No such post found!");
               }
               const like = await canModifyLike(userId, likeId);
               await like.delete();
               post.likes = post.likes.filter(like => like._id.toString() !== likeId);
               await post.save();
               return "Like removed successfully";
          }
     }
};

module.exports = postResolvers;