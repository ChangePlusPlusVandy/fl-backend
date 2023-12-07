import express from "express";
export const chatRouter = express.Router();
import {
  getAllChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
} from "../controllers/chat-controller";

chatRouter.get("/", getAllChats);
chatRouter.get("/:chatId", getChat);
chatRouter.post("/", createChat);
chatRouter.put("/:chatId", updateChat);
chatRouter.delete("/:chatId", deleteChat);
