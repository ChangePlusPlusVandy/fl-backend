import express from "express";
export const userRouter = express.Router();
const { getAllUsers } = require("../controllers/user-controller.ts");

userRouter.get("/", getAllUsers);
