import express from "express";
const router = express.Router();

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.post("/createPost", auth, createPost);
router.patch("/updatePost/:id", auth, updatePost);
router.patch("/deletePost/:id", auth, deletePost);
router.patch("/likePost/:id", auth, likePost);

export default router;
