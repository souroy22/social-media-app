const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    expression: {
     type: String,
     required: true,
     enum: ["LIKE", "ANGRY", "LOVE", "WOW"],
     default: "LIKE"
    },
    likedBy: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", likeSchema);
