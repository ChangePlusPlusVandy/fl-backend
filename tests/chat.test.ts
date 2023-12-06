import mongoose from "mongoose";
import { describe, expect, test } from "@jest/globals";
import { app } from "..";
import dotenv from "dotenv";
import request from "supertest";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

/* Closing database connection after each test. s*/
afterEach(async () => {
  await mongoose.connection.close();
});

let chatIds = [];
describe("INSERT /chats/", () => {
  it("should insert a chat", async () => {
    const chatBody = {
      users: [],
      messages: [],
    };
    const res = await request(app).post("/chat").send(chatBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(chatBody);
    chatIds.push(res.body._id);
  });
});

describe("GET /chats/", () => {
  it("should return chats", async () => {
    const res = await request(app).get("/chat");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
