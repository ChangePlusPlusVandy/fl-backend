import express from "express";
import {
  findAttendance,
  showAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

export const attendanceRouter = express.Router();

attendanceRouter.get("/", verifyHmacSignature, findAttendance);
attendanceRouter.get("/:attendanceId", verifyHmacSignature, showAttendance);
attendanceRouter.post("/", verifyHmacSignature, createAttendance);
attendanceRouter.patch("/:attendanceId", verifyHmacSignature, updateAttendance);
attendanceRouter.delete("/:attendanceId", verifyHmacSignature, deleteAttendance);
