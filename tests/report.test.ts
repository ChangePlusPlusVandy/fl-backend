import mongoose, { Mongoose } from "mongoose";
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

let reportIds: string[] = [];

describe("INSERT /report/", () => {
  it("should insert a report", async () => {
    const reportBody = {
      friendId: "65713d71d097d31b78bbed53",
      reportBody: "great work!",
      date: "2023-12-06T06:00:00.000Z"
    };

    const res = await request(app).post("/report").send(reportBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(reportBody);
    reportIds.push(res.body._id);
  });
});

describe("GET /report/", () => {
  it("should return report and contain all reportIds", async () => {
    const res = await request(app).get("/report");
    expect(res.statusCode).toBe(200);

    // Ensure that the response body is not empty
    expect(res.body.length).toBeGreaterThan(0);

    // Check if every ID in reportIds is present in the response body
    const allIdsPresent = reportIds.every(id => 
      res.body.some((report: { _id: string }) => report._id === id)
    );

    expect(allIdsPresent).toBe(true);
  });
});

const newReportBody = {
    friendId: "65713d71d097d31b78bbed53",
    reportBody: "great updated work!",
    date: "2023-12-07T06:00:00.000Z"
  };

  describe("PUT /report/", () => {
    it("should update a report", async () => {
      const res = (await request(app).put(`/report/${reportIds[0]}`).send(newReportBody));
      expect(res.statusCode).toBe(204);
    });
  });

  describe("GET /report/", () => {
    it("should show updated report", async () => {
        const res = await request(app).get(`/report/${reportIds[0]}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(newReportBody);
    });
  });

  describe("DELETE /report/", () => {
    it("should delete report", async () => {
        const res = await request(app).delete(`/report/${reportIds[0]}`);
        expect(res.statusCode).toBe(204);
    });
  });

  describe("GET /report/", () => {
    it("deleted report should not exist anymore", async () => {
      const res = await request(app).get("/report");
      expect(res.statusCode).toBe(200);
    
      const allIdsPresent = reportIds.every(id => 
        res.body.some((report: { _id: string }) => report._id === id)
      );
  
      expect(allIdsPresent).toBe(false);
    });
  });
  