import mongoose from "mongoose";
import { describe, expect, test } from "@jest/globals";
import { app } from "..";
import dotenv from "dotenv";
import request from "supertest";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /attendance/", () => {
  it("should return attendance", async () => {
    const res = await request(app).get("/attendance");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
