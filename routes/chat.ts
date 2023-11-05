import express from "express";
export const chatRouter = express.Router();
const { getAllUsers } = require("../controllers/chat-controller.ts");

chatRouter.get("/", getAllUsers);
