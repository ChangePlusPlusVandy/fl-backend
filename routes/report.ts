import { Router } from "express";
import {
  findReports,
  showReport,
  createReport,
  updateReport,
  deleteReport,
} from "../controllers/report-controller";

export const reportRouter = Router();

reportRouter.get("/", findReports);
reportRouter.get("/:reportId", showReport);
reportRouter.post("/", createReport);
reportRouter.patch("/:reportId", updateReport);
reportRouter.delete("/:reportId", deleteReport);
