import PostsModel from "../models/postMessageModel.js";
import mongoose from "mongoose";

const noPostIdError = "No posts with that id"
const deletePostSuccess = "Post item deleted successfully"

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostsModel.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostsModel({
    ...post,
    creatorId: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePosts = async (req, res) => {
  const { id: _id } = req.params;
  const posts = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(noPostIdError);
  const updatedPosts = await PostsModel.findByIdAndUpdate(_id, posts, {
    new: true,
  });
  res.json(updatedPosts);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(noPostIdError);

  await PostsModel.findByIdAndRemove(id);

  res.json({ message: deletePostSuccess });
};
