import express from "express";
import {
  login,
  register,
  editProfile,
  fetchUser,verifyUser
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", fetchUser);
router.patch("/me/:id", editProfile);
router.get("/confirm/:confirmationCode", verifyUser)

export default router;
