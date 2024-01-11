import { Router } from "express";
import {
  findReports,
  showReport,
  createReport,
  updateReport,
  deleteReport,
} from "../controllers/report-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

export const reportRouter = Router();

reportRouter.get("/", verifyHmacSignature, findReports);
reportRouter.get("/:reportId", verifyHmacSignature, showReport);
reportRouter.post("/", verifyHmacSignature, createReport);
reportRouter.patch("/:reportId", verifyHmacSignature, updateReport);
reportRouter.delete("/:reportId", verifyHmacSignature, deleteReport);