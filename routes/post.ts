import { Router } from "express";
import {
  findPosts,
  showPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

export const postRouter = Router();

postRouter.get("/", verifyHmacSignature, findPosts);
postRouter.get("/:postId", verifyHmacSignature, showPost);
postRouter.post("/", verifyHmacSignature, createPost);
postRouter.patch("/:postId", verifyHmacSignature, updatePost);
postRouter.delete("/:postId", verifyHmacSignature, deletePost);