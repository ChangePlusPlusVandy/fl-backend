import mongoose from "mongoose";
import { IChat } from "../types/database";

const chatSchema = new mongoose.Schema<IChat>({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: false,
    },
  ],
});

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
