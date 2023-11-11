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
messageRouter.post("/:messageId", createMessage);
messageRouter.put("/:messageId", updateMessage);
messageRouter.delete("/:messageId", deleteMessage);
