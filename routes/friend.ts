import { Router } from "express";
import {
  findFriends,
  showFriend,
  createFriend,
  updateFriend,
  deleteFriend,
  exportData,
} from "../controllers/friend-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

export const friendRouter = Router();

friendRouter.get("/", verifyHmacSignature, findFriends);
friendRouter.get("/exportData", verifyHmacSignature, exportData);
friendRouter.get("/:friendId", verifyHmacSignature, showFriend);
friendRouter.post("/", verifyHmacSignature, createFriend);
friendRouter.patch("/:friendId", verifyHmacSignature, updateFriend);
friendRouter.delete("/:friendId", verifyHmacSignature, deleteFriend);
