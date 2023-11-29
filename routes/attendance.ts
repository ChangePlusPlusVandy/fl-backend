import express from "express";
import {
  findAttendance,
  showAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance-controller";

export const attendanceRouter = express.Router();

attendanceRouter.get("/", findAttendance);
attendanceRouter.get("/:attendanceId", showAttendance);
attendanceRouter.post("/:attendanceId", createAttendance);
attendanceRouter.put("/:attendanceId", updateAttendance);
attendanceRouter.delete("/:attendanceId", deleteAttendance);