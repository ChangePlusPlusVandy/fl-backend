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

describe("Insert /message/", () => {
  it("should create a message", async () => {
    const messageBody = {
      messageBody: "Hello, this is a test message",
      timestamps: "2023-12-30T06:00:00.000Z",
      chatId: "657142aad097d31b78bbed63",
      sender: "65713d71d097d31b78bbed53",
      recipient: "658fc60a860335bf918a3702",
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

const updatedFields = {
  messageBody: "Updated message",
};

const updatedMessage = {
  messageBody: "Updated message",
  timestamps: "2023-12-30T06:00:00.000Z",
  chatId: "657142aad097d31b78bbed63",
  sender: "65713d71d097d31b78bbed53",
  recipient: "658fc60a860335bf918a3702",
};

describe("PATCH /message/:messageId", () => {
  it("should update a message", async () => {
    const res = await request(app)
      .patch(`/message/${messageIds[0]}`)
      .send(updatedFields);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /message/", () => {
  it("should show updated message", async () => {
    const res = await request(app).get(`/message/${messageIds[0]}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedMessage);
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
