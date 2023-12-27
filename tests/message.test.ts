import mongoose from "mongoose";
import { describe, expect } from "@jest/globals";
import { app } from "..";
import request from "supertest";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

let messageIds: string[] = [];

describe("POST /message/", () => {
  it("should create a message", async () => {
    const messageBody = {
      messageBody: "Hello, this is a test message",
      timestamps: new Date(),
      sender: new mongoose.Types.ObjectId(),
      recipient: new mongoose.Types.ObjectId(),
      chatId: new mongoose.Types.ObjectId(),
    };

    const res = await request(app).post("/message").send(messageBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(messageBody);
    messageIds.push(res.body._id);
  });
});

describe("GET /message/", () => {
  it("should return all messages", async () => {
    const res = await request(app).get("/message");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /message/:messageId", () => {
  it("should return a specific message", async () => {
    const res = await request(app).get(`/message/${messageIds[0]}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(messageIds[0]);
  });
});

const updatedMessageBody = {
  messageBody: "Updated message",
};

describe("PUT /message/:messageId", () => {
  it("should update a message", async () => {
    const res = await request(app)
      .put(`/message/${messageIds[0]}`)
      .send(updatedMessageBody);
    expect(res.statusCode).toBe(204);
  });
});

describe("DELETE /message/:messageId", () => {
  it("should delete a message", async () => {
    const res = await request(app).delete(`/message/${messageIds[0]}`);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /message/", () => {
  it("deleted message should not exist anymore", async () => {
    const res = await request(app).get("/message");
    expect(res.statusCode).toBe(200);

    const isMessageDeleted = messageIds.every(
      (id) => !res.body.some((message: { _id: string }) => message._id === id)
    );

    expect(isMessageDeleted).toBe(true);
  });
});
