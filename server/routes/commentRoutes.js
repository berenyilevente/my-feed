import express from "express";
import {
  getComments,
  addComments,
  deleteComment,
} from "../controllers/commentControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", authMiddleware, addComments);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
