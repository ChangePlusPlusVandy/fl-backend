import { Router } from "express";
import {
  findFriends,
  showFriend,
  createFriend,
  updateFriend,
  deleteFriend,
} from "../controllers/friend-controller";

export const friendRouter = Router();

friendRouter.get("/", findFriends);
friendRouter.get("/:friendId", showFriend);
friendRouter.post("/", createFriend);
friendRouter.put("/:friendId", updateFriend);
friendRouter.delete("/:friendId", deleteFriend);
