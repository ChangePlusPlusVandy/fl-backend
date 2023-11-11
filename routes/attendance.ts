import express from "express";
import { getAllAttendance } from "../controllers/attendance-controller";
export const attendanceRouter = express.Router();

attendanceRouter.get("/", getAllAttendance);
