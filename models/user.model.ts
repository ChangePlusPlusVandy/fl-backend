import mongoose from "mongoose";
import { IUser } from "../types/database";

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
  friends: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  chats: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

export const User = mongoose.model<IUser>('User', userSchema);
