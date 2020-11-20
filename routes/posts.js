import express from "express";
const router = express.Router();

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

router.get("/", getPosts);
router.post("/createPost", createPost);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);
router.patch("/likePost/:id", likePost);

export default router;
