import mongoose from "mongoose";

export interface IUser extends Document {
  firebaseUserId: string
  name: string;
  emailAddress: string
  phoneNumber: string
  forgotPasswordCode: string
  type: string;
  posts: mongoose.Types.ObjectId[];
  timestamp: Date;
  friends: mongoose.Types.ObjectId[];
  chats: mongoose.Types.ObjectId[];
  schedule: string[]
}

export interface IPost extends Document {
  userId: mongoose.Types.ObjectId;
  user: string;
  title: string;
  postBody: string;
  image?: string;
  likes: mongoose.Types.ObjectId[];
  dateCreated: Date;
}

export interface IMessage extends Document {
  messageBody: string;
  timestamps: Date;
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  chatId: mongoose.Types.ObjectId;
}

export interface IFriend extends Document {
  friendName: string;
  profilePicture: string;
  reports: mongoose.Types.ObjectId[];
  attendance: mongoose.Types.ObjectId[];
}

export interface IChat extends Document {
  users: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
}

export interface IAttendance extends Document {
  date: Date;
  friendIds: mongoose.Types.ObjectId;
  timeIns: Date[];
  timeOuts: Date[];
}

export interface IReport extends Document {
  friendId: mongoose.Types.ObjectId;
  reportBody: string;
  date: Date;
}
