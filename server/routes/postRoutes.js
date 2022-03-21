import express from "express";
import {
  getPosts,
  addPosts,
  updatePosts,
  deletePost,
} from "../controllers/postControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, addPosts);
router.patch("/:id", authMiddleware, updatePosts);
router.delete("/:id", authMiddleware, deletePost);

export default router;
