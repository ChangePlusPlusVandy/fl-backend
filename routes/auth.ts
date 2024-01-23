import express from "express";
import { createAccount } from "../controllers/auth-controller";

export const authRouter = express.Router();

authRouter.get("/create-account", createAccount);