import CommentModel from "../models/commentModel.js";
import mongoose from "mongoose";


const noCommentIdError = "No comments with that id"
const commentDeleteSuccess = "Comment deleted successfully"

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addComments = async (req, res) => {
  const comment = req.body;

  const newComment = new CommentModel({
    ...comment,
    commentId: req._id,
    createdAt: new Date().toISOString(),
  });
  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(noCommentIdError);
  await CommentModel.findByIdAndRemove(id);
  res.json({ message: commentDeleteSuccess});
};
