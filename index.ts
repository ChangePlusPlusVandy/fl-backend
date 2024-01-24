import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { attendanceRouter } from "./routes/attendance";
import { chatRouter } from "./routes/chat";
import { friendRouter } from "./routes/friend";
import { messageRouter } from "./routes/message";
import { postRouter } from "./routes/post";
import { reportRouter } from "./routes/report";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";

dotenv.config();

mongoose.connect(process.env.MONGO_URI || "");

if (process.env.NODE_ENV !== "test") {
  mongoose.connection.on("connected", () => {
    console.log("mongo connected");
  });
}

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3001");

app.use(cors()); // Allow cross-origin requests (for frontend to communicate with backend on different ports/address)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in req
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

app.use("/attendance", attendanceRouter);
app.use("/chat", chatRouter);
app.use("/friend", friendRouter);
app.use("/message", messageRouter);
app.use("/post", postRouter);
app.use("/report", reportRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

export default { app };
