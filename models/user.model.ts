import mongoose from "mongoose";
import { IUser } from "../types/database";

const userSchema = new mongoose.Schema<IUser>({
  firebaseUserId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  forgotPasswordCode: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
  schedule: [
    {
      type: String,
    },
  ]
});

export const User = mongoose.model<IUser>('User', userSchema);
