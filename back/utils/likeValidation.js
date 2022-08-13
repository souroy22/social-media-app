const { UserInputError, AuthenticationError } = require("apollo-server");
const Like = require("../models/likeModel");


const canModifyLike = async (userId, likeId) => {
     const isLiked = await Like.findById(likeId);
     if(!isLiked){
          throw new UserInputError("No such like found");
     }
     if(isLiked.likedBy.toString() !== userId){
          throw new AuthenticationError("Action not allowed");
     }
     return isLiked;
}

module.exports = {canModifyLike};