import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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

export const Attendance = mongoose.model('Attendance', attendanceSchema);