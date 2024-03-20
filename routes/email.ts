import { Router } from "express";
import { sendEmail } from "../controllers/email-controller";
import { verifyHmacSignature } from "../middleware/verifySignature";

export const emailRouter = Router();

emailRouter.post("/", verifyHmacSignature, sendEmail);
