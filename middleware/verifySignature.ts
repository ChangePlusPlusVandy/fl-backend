import { type Request, type Response, type NextFunction } from "express";
import cryptoJs from "crypto-js";

export const verifyHmacSignature = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const signatureName = "Friends-Life-Signature";
  const receivedSignature = request?.header(signatureName);
  let requestBody = "";

  if (Object.keys(request.body).length !== 0) {
    requestBody = JSON.stringify(request.body);
  } else if (Object.keys(request.params).length !== 0) {
    requestBody = JSON.stringify(request.params);
  } else if (
    Object.keys(request.body).length === 0 &&
    Object.keys(request.params).length === 0
  ) {
    requestBody = request.method;
  }

  const secretKey = process.env.SECRET_KEY;

  if (secretKey === undefined) return false;

  const calculatedSignature = generateHmacSignature(requestBody, secretKey);

  if (
    receivedSignature !== undefined &&
    secureCompare(receivedSignature, calculatedSignature)
  ) {
    return next();
  }
  return response.status(401).json({ error: "Unauthorized" });
};

const secureCompare = (a: string, b: string) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < bufA.length; i++) {
    result |= bufA[i] ^ bufB[i];
  }

  return result === 0;
};

export const generateHmacSignature = (
  requestBody: string,
  secretKey: string
): string => {
  const hmac = cryptoJs.HmacSHA256(requestBody, secretKey);
  const signatureBase64 = cryptoJs.enc.Base64.stringify(hmac);
  return signatureBase64;
};
