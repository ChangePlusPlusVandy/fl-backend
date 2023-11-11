import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reportBody: {
      type: String
    },
    date: {
      type: Date
    }
  });

export const Report = mongoose.model('Report', reportSchema);