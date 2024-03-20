import mongoose from "mongoose";
import { describe, expect } from "@jest/globals";
import app from "..";
import request from "supertest";
import { generateHmacSignature } from "../middleware/verifySignature";

// Connecting to the database before each test
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

// Closing database connection after each test
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /email/", () => {
  it("should send an email", async () => {
    const emailBody = {
      to: "friendslifedev@gmail.com",
      subject: "Test Email",
      text: "This is a test email",
    };
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify(emailBody),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .post("/email")
      .send(emailBody)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ message: "Email sent" });
  });
});
