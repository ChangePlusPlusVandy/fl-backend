import mongoose from "mongoose";
import { describe, expect, test } from "@jest/globals";
import { app } from "..";
import dotenv from "dotenv";
import request from "supertest";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

<<<<<<< HEAD
/* Closing database connection after each test. */
=======
/* Closing database connection after each test. s*/
>>>>>>> 83fa9e6a3f0243118126b45dda69fc7c48fbe891
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
