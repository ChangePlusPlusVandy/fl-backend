import { type Request, type Response, type NextFunction } from "express";
import { auth } from "../firebase-config";
import "dotenv/config";

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    // Verifies the token and decodes it to get associated user data
    // and stores it in req.body.user to be accessed by other routes
    const decodeValue = await auth.verifyIdToken(token);

    if (!decodeValue) {
      return response.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (e) {
    next(e); // Pass the error to Express error-handling middleware
  }
};
