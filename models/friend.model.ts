
import mongoose, {Document, Schema, Types} from "mongoose";
import { Friend } from "../types/database";

const friendSchema: Schema<Friend> = new Schema({
    friendName: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
        required: true,
        trim: true
    },
    reports: [{
        type: mongoose.Types.ObjectId,
        ref: 'Report'
    }],
    attendance: [{
        type: mongoose.Types.ObjectId,
        ref: 'Attendance'
    }]
}, {
    timestamps: true
});

const FriendModel = mongoose.model<Friend>('Friend', friendSchema);

export default FriendModel;



