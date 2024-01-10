import { Router } from "express";
import {
  findFriends,
  showFriend,
  createFriend,
  updateFriend,
  deleteFriend,
} from "../controllers/friend-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

export const friendRouter = Router();

friendRouter.get("/", verifyHmacSignature, findFriends);
friendRouter.get("/:friendId", verifyHmacSignature, showFriend);
friendRouter.post("/", verifyHmacSignature, createFriend);
friendRouter.patch("/:friendId", verifyHmacSignature, updateFriend);
friendRouter.delete("/:friendId", verifyHmacSignature, deleteFriend);