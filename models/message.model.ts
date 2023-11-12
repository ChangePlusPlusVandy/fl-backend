import mongoose, {Document, Schema, Types} from "mongoose";
import { IMessage } from "../types/database";

const messageSchema: Schema<IMessage> = new Schema<IMessage>({
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
const MessageModel = mongoose.model<IMessage>('Message', messageSchema);

module.exports = MessageModel;
