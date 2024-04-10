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
  profilePicture: {
    type: String,
    required: false,
    default:
      "https://res.cloudinary.com/dvrcdxqex/image/upload/v1707870630/defaultProfilePic.png",
  },
  emailAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: "",
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
  ],
  approved: {
    type: Boolean,
    default: false,
  },
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
});

export const User = mongoose.model<IUser>("User", userSchema);
