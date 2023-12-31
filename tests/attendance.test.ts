import mongoose from "mongoose";
import { describe, expect } from "@jest/globals";
import { app } from "..";
import request from "supertest";

// Connecting to the database before each test
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

// Closing database connection after each test
afterEach(async () => {
  await mongoose.connection.close();
});

let attendanceIds: string[] = [];

describe("Insert /attendance/", () => {
  it("should create an attendance record", async () => {
    const attendanceBody = {
      date: "2023-12-30T06:00:00.000Z",
      friendIds: "65713e67d097d31b78bbed56",
      timeIns: ["2023-12-30T07:00:00.000Z"],
      timeOuts: ["2023-12-30T08:00:00.000Z"],
    };

    const res = await request(app).post("/attendance").send(attendanceBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      date: expect.any(String),
      friendIds: expect.any(String),
      timeIns: expect.any(Array),
      timeOuts: expect.any(Array),
    });
    attendanceIds.push(res.body._id);
  });
});

describe("GET /attendance/", () => {
  it("should return all attendance records", async () => {
    const res = await request(app).get("/attendance");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /attendance/:attendanceId", () => {
  it("should return a specific attendance record", async () => {
    const res = await request(app).get(`/attendance/${attendanceIds[0]}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(attendanceIds[0]);
  });
});

const updatedFields = {
  timeIns: ["2023-12-30T09:00:00.000Z"],
};

const updatedAttendance = {
  date: "2023-12-30T06:00:00.000Z",
  friendIds: "65713e67d097d31b78bbed56",
  timeIns: ["2023-12-30T09:00:00.000Z"],
  timeOuts: ["2023-12-30T08:00:00.000Z"],
};

describe("PATCH /attendance/:attendanceId", () => {
  it("should update an attendance record", async () => {
    const res = await request(app)
      .patch(`/attendance/${attendanceIds[0]}`)
      .send(updatedFields);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /attendance/:attendanceId", () => {
  it("should show updated attendance record", async () => {
    const res = await request(app).get(`/attendance/${attendanceIds[0]}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedAttendance);
  });
});

describe("DELETE /attendance/:attendanceId", () => {
  it("should delete an attendance record", async () => {
    const res = await request(app).delete(`/attendance/${attendanceIds[0]}`);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /attendance/", () => {
  it("deleted attendance record should not exist anymore", async () => {
    const res = await request(app).get("/attendance");
    expect(res.statusCode).toBe(200);

    const isAttendanceDeleted = attendanceIds.every(
      (id) =>
        !res.body.some((attendance: { _id: string }) => attendance._id === id)
    );

    expect(isAttendanceDeleted).toBe(true);
  });
});
