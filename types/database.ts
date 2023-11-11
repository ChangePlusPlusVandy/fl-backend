import mongoose from "mongoose";

export interface User extends Document {
  name: string;
  type: string;
  posts: mongoose.Types.ObjectId[];
  timestamp: Date;
  friends: mongoose.Types.ObjectId[];
  chats: mongoose.Types.ObjectId[];
}

export interface Post extends Document {
  userId: mongoose.Types.ObjectId;
  user: string;
  title: string;
  postBody: string;
  image?: string;
  likes: mongoose.Types.ObjectId[];
  dateCreated: Date;
}

export interface Message extends Document {
  messageBody: string;
  timestamps: Date;
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
}

export interface Friend extends Document {
  friendName: string;
  profilePicture: string;
  reports: mongoose.Types.ObjectId[];
  attendance: mongoose.Types.ObjectId[];
}

export interface Chat extends Document {
  users: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
}

export interface Attendance extends Document {
  date: Date;
  friendIds: mongoose.Types.ObjectId;
  timeIns: Date[];
  timeOuts: Date[];
}

export interface Report extends Document {
  friendId: mongoose.Types.ObjectId;
  reportBody: string;
  date: Date;
}
