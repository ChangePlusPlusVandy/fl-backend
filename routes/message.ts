import express from "express";
import { getAllMessages } from "../controllers/message-controller"
export const messageRouter = express.Router();

messageRouter.get("/", getAllMessages);
