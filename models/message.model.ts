import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
  messageBody: {
    type: String,
    required: true,
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
}); 

export const Message = mongoose.model('Message', messageSchema);
