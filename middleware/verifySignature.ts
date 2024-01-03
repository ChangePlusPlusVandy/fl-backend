import { type Request, type Response, type NextFunction } from "express";
import { createHmac } from "crypto";
​
export const verifyHmacSignature = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const signatureName = "Friends-Life-Signature";
  const receivedSignature = request?.header(signatureName);
​
  let requestBody = {};
​
  if (request.method === "GET") requestBody = request.query;
  if (request.method === "POST") requestBody = request.body;
​
  const secretKey = process.env.SECRET_KEY;

  if (secretKey === undefined) return false;

  const secret = Buffer.from(secretKey, "base64");
  const hmac = createHmac("sha256", secret);
  const calculatedSignature = hmac
    .update(JSON.stringify(requestBody))
    .digest()
    .toString("base64");
​  if (receivedSignature !== undefined && secureCompare(receivedSignature, calculatedSignature)) {
    next();
  }
  return response.status(401).json({ error: "Unauthorized" });
};
​
const secureCompare = (a: string, b: string) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
​
  if (bufA.length !== bufB.length) {
    return false;
  }
​
  let result = 0;
  for (let i = 0; i < bufA.length; i++) {
    result |= bufA[i] ^ bufB[i];
  }
​
  return result === 0;
};