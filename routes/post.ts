import { Router } from "express";
import {
  findPosts,
  showPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post-controller";

export const postRouter = Router();

postRouter.get("/", findPosts);
postRouter.get("/:postId", showPost);
postRouter.post("/", createPost);
postRouter.put("/:postId", updatePost);
postRouter.delete("/:postId", deletePost);
