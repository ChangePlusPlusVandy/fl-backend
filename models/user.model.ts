import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
