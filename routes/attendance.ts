import express from "express";
export const attendanceRouter = express.Router();
const { getAllAttendance } = require("../controllers/u-controller.ts");

attendanceRouter.get("/", getAllAttendance);
