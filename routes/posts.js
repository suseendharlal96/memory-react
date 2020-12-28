import express from "express";
import multer from "multer";
const router = express.Router();

import {
  getPosts,
  createPost,
  updatePost,
  updatePostWithoutFile,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getPosts);
router.post("/createPost", auth, upload.single("file"), createPost);
router.patch("/updatePostWithoutFile/:id", auth, updatePostWithoutFile);
router.patch("/updatePost/:id", auth, upload.single("file"), updatePost);
router.patch("/deletePost/:id", auth, deletePost);
router.patch("/likePost/:id", auth, likePost);

export default router;
