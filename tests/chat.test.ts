import mongoose from "mongoose";
import { describe, expect } from "@jest/globals";
import app from "..";
import request from "supertest";
import { generateHmacSignature } from "../middleware/verifySignature";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

/* Closing database connection after each test. s*/
afterEach(async () => {
  await mongoose.connection.close();
});

let chatIds: string[] = [];

describe("INSERT /chat/", () => {
  it("should insert a chat", async () => {
    const chatBody = {
      users: ["65713d71d097d31b78bbed53"],
      messages: ["65715f56955a8e773cca2cb7"],
    };
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify(chatBody),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .post("/chat")
      .send(chatBody)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(chatBody);
    chatIds.push(res.body._id);
  });
});

describe("GET /chat/", () => {
  it("should return chat and contain all chatIds", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature("GET", process.env.SECRET_KEY);
    const res = await request(app)
      .get("/chat")
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);

    // Ensure that the response body is not empty
    expect(res.body.length).toBeGreaterThan(0);

    // Check if every ID in chatIds is present in the response body
    const allIdsPresent = chatIds.every((id) =>
      res.body.some((chat: { _id: string }) => chat._id === id)
    );

    expect(allIdsPresent).toBe(true);
  });
});

const updatedFields = {
  messages: ["6590701e493a636b9b9d84aa"],
};

const updatedChat = {
  users: ["65713d71d097d31b78bbed53"],
  messages: ["6590701e493a636b9b9d84aa"],
};

describe("PATCH /chat/", () => {
  it("should update a chat", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify(updatedFields),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .patch(`/chat/${chatIds[0]}`)
      .send(updatedFields)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /chat/", () => {
  it("should show updated chat", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify({ chatId: chatIds[0] }),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .get(`/chat/${chatIds[0]}`)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedChat);
  });
});

describe("DELETE /chat/", () => {
  it("should delete chat", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify({ chatId: chatIds[0] }),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .delete(`/chat/${chatIds[0]}`)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /chat/", () => {
  it("deleted chat should not exist anymore", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature("GET", process.env.SECRET_KEY);
    const res = await request(app)
      .get("/chat")
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);

    const allIdsPresent = chatIds.every((id) =>
      res.body.some((chat: { _id: string }) => chat._id === id)
    );

    expect(allIdsPresent).toBe(false);
  });
});
