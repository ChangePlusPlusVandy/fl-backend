import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_URI || "");

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3001");

app.use(cors()); // Allow cross-origin requests (for frontend to communicate with backend on different ports/address)
app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in req
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with urlencoded payloads

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
