import mongoose from "mongoose";
import { IReport } from '../types/database';

const reportSchema = new mongoose.Schema<IReport>({
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

export const Report = mongoose.model<IReport>('Report', reportSchema);