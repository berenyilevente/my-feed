import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
  title: String,
  message: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  creatorId: String,
  postedBy: String,
});

const PostsModel = mongoose.model("PostsModel", postsSchema);
export default PostsModel;
