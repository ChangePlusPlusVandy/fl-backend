import mongoose, {Document, Schema, Types} from "mongoose";
import { Chat } from "../types/database";

const chatSchema = new mongoose.Schema({
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }]
  });
const ChatModel = mongoose.model<Chat>('Chat', chatSchema);

export default ChatModel;
  