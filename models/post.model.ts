import mongoose from "mongoose";
import { IPost } from "../types/database";

const postSchema = new mongoose.Schema<IPost>({
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

export const Post = mongoose.model<IPost>('Post', postSchema);