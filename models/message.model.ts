import mongoose from "mongoose";
import { IMessage } from "../types/database";

const messageSchema = new mongoose.Schema<IMessage>({
  messageBody: {
    type: String,
    required: true,
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
}); 

export const Message = mongoose.model<IMessage>('Message', messageSchema);
