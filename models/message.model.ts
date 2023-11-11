import mongoose, {Document, Schema, Types} from "mongoose";
import { Message } from "../types/database";

const messageSchema: Schema<Message> = new Schema({
    messageBody: {
        type: String,
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
