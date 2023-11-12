import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
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

export const Friend = mongoose.model('Friend', friendSchema);


