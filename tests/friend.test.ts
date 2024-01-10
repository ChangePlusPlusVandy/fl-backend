import mongoose from "mongoose";
import { describe, expect } from "@jest/globals";
import { app } from "..";
import request from "supertest";
import { createHmac } from "crypto";
import { generateHmacSignature, verifyHmacSignature } from "../middleware/verifySignature";

// Connecting to the database before each test
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

// Closing database connection after each test
afterEach(async () => {
  await mongoose.connection.close();
});

let friendIds: string[] = [];

describe("Insert /friend/", () => {
  it("should create a friend record", async () => {
    const friendBody = {
      friendName: "John Doe",
      profilePicture: "http://example.com/profile.jpg",
      reports: ["657155f584f804291d32b120"],
      attendance: ["65714114d097d31b78bbed60"],
    };

    const res = await request(app).post("/friend").send(friendBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      friendName: expect.any(String),
      profilePicture: expect.any(String),
      reports: expect.any(Array),
      attendance: expect.any(Array),
    });
    friendIds.push(res.body._id);
  });
});

describe("GET /friend/", () => {
  it("should return all friends", async () => {
    const res = await request(app).get("/friend");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /friend/:friendId", () => {
  it("should return a specific friend", async () => {
    if(process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(JSON.stringify({ friendId: friendIds[0] }), process.env.SECRET_KEY);
    const res = await request(app).get(`/friend/${friendIds[0]}`).set('Friends-Life-Signature', hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(friendIds[0]);
  });
});

const updatedFields = {
  friendName: "Jane Doe",
  profilePicture: "http://example.com/updated-profile.jpg",
};

const updatedFriend = {
  friendName: "Jane Doe",
  profilePicture: "http://example.com/updated-profile.jpg",
  reports: ["657155f584f804291d32b120"],
  attendance: ["65714114d097d31b78bbed60"],
};

describe("PATCH /friend/:friendId", () => {
  it("should update a friend record", async () => {
    const res = await request(app)
      .patch(`/friend/${friendIds[0]}`)
      .send(updatedFields);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /friend/:friendId", () => {
  it("should show updated friend", async () => {
    if(process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(JSON.stringify({ friendId: friendIds[0] }), process.env.SECRET_KEY);
    const res = await request(app).get(`/friend/${friendIds[0]}`).set('Friends-Life-Signature', hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedFriend);
  });
});

describe("DELETE /friend/:friendId", () => {
  it("should delete a friend", async () => {
    const res = await request(app).delete(`/friend/${friendIds[0]}`);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /friend/", () => {
  it("deleted friend should not exist anymore", async () => {
    const res = await request(app).get("/friend");
    expect(res.statusCode).toBe(200);

    const isFriendDeleted = friendIds.every(
      (id) => !res.body.some((friend: { _id: string }) => friend._id === id)
    );

    expect(isFriendDeleted).toBe(true);
  });
});
