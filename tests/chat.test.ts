import mongoose from "mongoose";
import { describe, expect } from "@jest/globals";
import { app } from "..";
import request from "supertest";

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

    const res = await request(app).post("/chat").send(chatBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(chatBody);
    chatIds.push(res.body._id);
  });
});

describe("GET /chat/", () => {
  it("should return chat and contain all chatIds", async () => {
    const res = await request(app).get("/chat");
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

const newChatBody = {
  users: [],
  messages: ["65715f56955a8e773cca2cb7"],
};

describe("PUT /chat/", () => {
  it("should update a chat", async () => {
    const res = await request(app).put(`/chat/${chatIds[0]}`).send(newChatBody);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /chat/", () => {
  it("should show updated chat", async () => {
    const res = await request(app).get(`/chat/${chatIds[0]}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(newChatBody);
  });
});

describe("DELETE /chat/", () => {
  it("should delete chat", async () => {
    const res = await request(app).delete(`/chat/${chatIds[0]}`);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /chat/", () => {
  it("deleted chat should not exist anymore", async () => {
    const res = await request(app).get("/chat");
    expect(res.statusCode).toBe(200);

    const allIdsPresent = chatIds.every((id) =>
      res.body.some((chat: { _id: string }) => chat._id === id)
    );

    expect(allIdsPresent).toBe(false);
  });
});
