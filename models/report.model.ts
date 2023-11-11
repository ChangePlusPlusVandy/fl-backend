import mongoose, {Document, Schema, Types} from "mongoose";
import { Report } from "../types/database";

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
const ReportModel = mongoose.model<Report>('Report', reportSchema);

export default ReportModel;