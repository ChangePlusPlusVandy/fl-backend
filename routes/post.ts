import { Router } from "express";
import {
  findPosts,
  showPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post-controller";

export const postRouter = Router();

<<<<<<< HEAD
postRouter.get("/", findPosts);
postRouter.get("/:postId", showPost);
postRouter.post("/", createPost);
postRouter.put("/:postId", updatePost);
postRouter.delete("/:postId", deletePost);
=======
postRouter.get('/', findPosts);
postRouter.get('/:postId', showPost);
postRouter.post('/', createPost);
postRouter.put('/:postId', updatePost);
postRouter.delete('/:postId', deletePost);
>>>>>>> e5d5b751f3422791d06e7bdb48d5a2ffbde92d25
