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

friendRouter.get("/", findFriends);
friendRouter.get("/:friendId", verifyHmacSignature, showFriend);
friendRouter.post("/", createFriend);
friendRouter.patch("/:friendId", updateFriend);
friendRouter.delete("/:friendId", deleteFriend);
