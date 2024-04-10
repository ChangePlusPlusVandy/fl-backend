import { Router } from "express";
import {
  findUsers,
  showUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  blockUser
} from "../controllers/user-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

export const userRouter = Router();

userRouter.get("/", verifyHmacSignature, findUsers);
userRouter.get("/:userId", verifyHmacSignature, showUser);
userRouter.get("/firebase/:firebaseId", verifyHmacSignature, getUser);
userRouter.post("/", verifyHmacSignature, createUser);
userRouter.patch("/:userId", verifyHmacSignature, updateUser);
userRouter.delete("/:userId", verifyHmacSignature, deleteUser);
userRouter.post("/blockUser", verifyHmacSignature, blockUser);