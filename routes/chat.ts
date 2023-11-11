import express from "express";
export const chatRouter = express.Router();
import { getAllChats } from "../controllers/chat-controller";

chatRouter.get("/", getAllChats);
