const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // TODO: create a separate Schema for comment
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
