import mongoose, { Schema } from "mongoose";
import { Post } from "../types/database";

const attendanceSchema: Schema = new Schema(
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
