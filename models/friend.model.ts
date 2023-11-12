import mongoose from "mongoose";
import { IFriend } from "../types/database";

const friendSchema = new mongoose.Schema<IFriend>({
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

export const Friend = mongoose.model<IFriend>('Friend', friendSchema);


