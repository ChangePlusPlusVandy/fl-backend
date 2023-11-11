import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
    },
    forgotPasswordCode: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }],
    timestamp: {
        type: Date,
        default: Date.now
    },
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    chats: [{
        type: mongoose.Types.ObjectId,
        ref: 'Chat'
    }]
});

export const User = mongoose.model('User', userSchema);