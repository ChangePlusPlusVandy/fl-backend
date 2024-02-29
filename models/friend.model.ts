import mongoose from "mongoose";
import { IFriend } from "../types/database";

const friendSchema = new mongoose.Schema<IFriend>(
  {
    friendName: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dvrcdxqex/image/upload/v1707870630/defaultProfilePic.png",
      trim: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],
    schedule: {
      type: [Number],
      default: [0, 0, 0, 0, 0, 0, 0],
    },
  },
  {
    timestamps: true,
  }
);

export const Friend = mongoose.model<IFriend>("Friend", friendSchema);
