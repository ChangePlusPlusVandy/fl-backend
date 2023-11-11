import express from "express";
import { getAllReports } from "../controllers/report-controller";
export const reportRouter = express.Router();


reportRouter.get("/", getAllReports);