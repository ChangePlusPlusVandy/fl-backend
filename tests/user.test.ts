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

let userIds: string[] = [];
let firebaseIds: string[] = [];
const userBody = {
  firebaseUserId: "jesttestjest",
  name: "jest",
  emailAddress: "test@test.com",
  phoneNumber: "408-192-5432",
  type: "friend",
  posts: ["6571401cd097d31b78bbed5e"],
  timestamp: "2023-12-06T06:00:00.000Z",
  friends: ["65713e67d097d31b78bbed56"],
  chats: ["657142aad097d31b78bbed63"],
  schedule: ["1", "2", "3", "4", "5"],
};

describe("INSERT /user/", () => {
  it("should insert a user", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify(userBody),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .post("/user")
      .send(userBody)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(userBody);
    userIds.push(res.body._id);
    firebaseIds.push(res.body.firebaseUserId);
  });
});

describe("GET /user/", () => {
  it("should return user and contain all userIds", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature("GET", process.env.SECRET_KEY);
    const res = await request(app)
      .get("/user")
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);

    // Ensure that the response body is not empty
    expect(res.body.length).toBeGreaterThan(0);

    // Check if every ID in userIds is present in the response body
    const allIdsPresent = userIds.every((id) =>
      res.body.some((user: { _id: string }) => user._id === id)
    );

    expect(allIdsPresent).toBe(true);
  });
});

describe("GET /user/:userId", () => {
  it("should show updated user", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify({ userId: userIds[0] }),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .get(`/user/${userIds[0]}`)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(userBody);
  });
});

describe("GET /user/firebase", () => {
  it("should show user with the given firebase id", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify({ firebaseId: firebaseIds[0] }),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .get(`/user/firebase/${firebaseIds[0]}`)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(userBody);
  });
});

const updatedFields = {
  name: "updated jest",
};

const updatedUser = {
  firebaseUserId: "jesttestjest",
  name: "updated jest",
  type: "friend",
  posts: ["6571401cd097d31b78bbed5e"],
  timestamp: "2023-12-06T06:00:00.000Z",
  friends: ["65713e67d097d31b78bbed56"],
  chats: ["657142aad097d31b78bbed63"],
  schedule: ["1", "2", "3", "4", "5"],
};

describe("PATCH /user/", () => {
  it("should update a user", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify(updatedFields),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .patch(`/user/${userIds[0]}`)
      .send(updatedFields)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /user/:userId", () => {
  it("should show updated user", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify({ userId: userIds[0] }),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .get(`/user/${userIds[0]}`)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedUser);
  });
});

describe("GET /user/firebase/", () => {
  it("should show updated user with the given firebase id", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify({ firebaseId: firebaseIds[0] }),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .get(`/user/firebase/${firebaseIds[0]}`)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedUser);
  });
});

describe("DELETE /user/", () => {
  it("should delete user", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature(
      JSON.stringify({ userId: userIds[0] }),
      process.env.SECRET_KEY
    );
    const res = await request(app)
      .delete(`/user/${userIds[0]}`)
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /user/", () => {
  it("deleted user should not exist anymore", async () => {
    if (process.env.SECRET_KEY === undefined) return false;
    const hmacSignature = generateHmacSignature("GET", process.env.SECRET_KEY);
    const res = await request(app)
      .get("/user")
      .set("Friends-Life-Signature", hmacSignature);
    expect(res.statusCode).toBe(200);

    const allIdsPresent = userIds.every((id) =>
      res.body.some((report: { _id: string }) => report._id === id)
    );

    expect(allIdsPresent).toBe(false);
  });
});
