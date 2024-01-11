import express from "express";
export const chatRouter = express.Router();
import {
  getAllChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
} from "../controllers/chat-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

chatRouter.get("/", verifyHmacSignature, getAllChats);
chatRouter.get("/:chatId", verifyHmacSignature, getChat);
chatRouter.post("/", verifyHmacSignature, createChat);
chatRouter.patch("/:chatId", verifyHmacSignature, updateChat);
chatRouter.delete("/:chatId", verifyHmacSignature, deleteChat);
