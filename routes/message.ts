import express from "express";
export const messageRouter = express.Router();

const { getAllMessages } = require("../controllers/message-controller.ts");

messageRouter.get("/", getAllMessages);