import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    user: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String
    },
    postBody: {
        type: String
    },
    image: {
        type: String
        //figure this out later
    },
    likes: [{
        type: mongoose.Types.ObjectId
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;