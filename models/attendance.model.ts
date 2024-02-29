import mongoose from "mongoose";
import { IAttendance } from "../types/database";

const attendanceSchema = new mongoose.Schema<IAttendance>(
  {
    date: {
      type: Date,
      required: true,
    },
    friendIds: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend",
    },
    timeIns: [
      {
        type: Date,
      },
    ],
    timeOuts: [
      {
        type: Date,
      },
    ],
    transportation: {
      type: Boolean,
      default: false,
    },
    socialClub: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Attendance = mongoose.model<IAttendance>(
  "Attendance",
  attendanceSchema
);
