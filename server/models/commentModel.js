import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  commentToPostId: String,
  comment: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  commenter: String,
  commenterUserId: String,
});

const CommentModel = mongoose.model("CommentModel", commentSchema);
export default CommentModel;
