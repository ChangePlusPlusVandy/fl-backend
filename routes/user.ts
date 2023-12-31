import { Router } from "express";
import {
  findUsers,
  showUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user-controller";

export const userRouter = Router();

userRouter.get("/", findUsers);
userRouter.get("/:userId", showUser);
userRouter.post("/", createUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
