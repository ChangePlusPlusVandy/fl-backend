import express from "express";
import { getAllPosts } from "../controllers/post-controller";
export const postRouter = express.Router();

postRouter.get("/", getAllPosts);
