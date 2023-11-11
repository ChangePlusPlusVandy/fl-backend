import express from "express";
import { getAllFriends } from "../controllers/friend-controller";
export const friendRouter = express.Router();

friendRouter.get("/", getAllFriends);
