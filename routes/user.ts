import express from "express";
import { getAllUsers, insertUser} from "../controllers/user-controller";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/insertUser", insertUser);
