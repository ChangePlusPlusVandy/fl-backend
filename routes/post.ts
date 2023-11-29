import { Router } from 'express';
import {
  findPosts,
  showPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post-controller";

export const userRouter = Router();

userRouter.get('/', findPosts);
userRouter.get('/:postId', showPost);
userRouter.post('/', createPost);
userRouter.put('/:postId', updatePost);
userRouter.delete('/:postId', deletePost);
