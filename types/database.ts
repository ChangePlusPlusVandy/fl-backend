import mongoose from "mongoose";

export interface IUser extends Document {
  firebaseUserId: string;
  name: string;
  profilePicture: string;
  emailAddress: string;
  phoneNumber: string;
  forgotPasswordCode: string;
  type: string;
  posts: mongoose.Types.ObjectId[];
  timestamp: Date;
  friends: mongoose.Types.ObjectId[];
  chats: mongoose.Types.ObjectId[];
  schedule: string[];
  approved: boolean;
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
  families: mongoose.Types.ObjectId[];
  profilePicture: string;
  reports: mongoose.Types.ObjectId[];
  attendance: mongoose.Types.ObjectId[];
  schedule: number[];
}

export interface IChat extends Document {
  user1: mongoose.Types.ObjectId;
  user2: mongoose.Types.ObjectId;
  messages: mongoose.Types.ObjectId[];
}

export interface IAttendance extends Document {
  date: Date;
  friendId: mongoose.Types.ObjectId;
  timeIns: Date[];
  timeOuts: Date[];
  transportation: boolean;
  socialClub: boolean;
}

export interface IReport extends Document {
  friendId: mongoose.Types.ObjectId;
  reportBody: string;
  date: Date;
}
