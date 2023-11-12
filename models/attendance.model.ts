import mongoose from "mongoose";
import { IAttendance } from "../types/database";

const attendanceSchema = new mongoose.Schema<IAttendance>(
  {
    date: {
      type: Date,
      required: true,
    },
    friendId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friend",
    },
    timeIns: [{ 
      type: Date 
    }],
    timeOuts: [{ 
      type: Date 
    }],
  },
  {
    timestamps: true,
  }
);

export const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);