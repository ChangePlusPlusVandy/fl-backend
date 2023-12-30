import express from "express";
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message-controller";

export const messageRouter = express.Router();

messageRouter.get("/", getAllMessages);
messageRouter.get("/:messageId", getMessage);
messageRouter.post("/", createMessage);
messageRouter.patch("/:messageId", updateMessage);
messageRouter.delete("/:messageId", deleteMessage);
