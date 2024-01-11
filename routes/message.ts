import express from "express";
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

export const messageRouter = express.Router();

messageRouter.get("/", verifyHmacSignature, getAllMessages);
messageRouter.get("/:messageId", verifyHmacSignature, getMessage);
messageRouter.post("/", verifyHmacSignature, createMessage);
messageRouter.patch("/:messageId", verifyHmacSignature, updateMessage);
messageRouter.delete("/:messageId", verifyHmacSignature, deleteMessage);
