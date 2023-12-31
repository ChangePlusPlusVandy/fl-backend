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

let postIds: string[] = [];

describe("Insert /post/", () => {
  it("should create a post", async () => {
    const postBody = {
      userId: "65713d71d097d31b78bbed53",
      user: "testuser",
      title: "Test Post",
      postBody: "This is a test post",
      image: "http://example.com/test.jpg",
      likes: ["658fc60a860335bf918a3702"],
      dateCreated: "2023-12-30T06:00:00.000Z",
    };

    const res = await request(app).post("/post").send(postBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      userId: expect.any(String),
      user: expect.any(String),
      title: expect.any(String),
      postBody: expect.any(String),
      image: expect.any(String),
      likes: expect.any(Array),
      dateCreated: expect.any(String),
    });
    postIds.push(res.body._id);
  });
});

describe("GET /post/", () => {
  it("should return all posts", async () => {
    const res = await request(app).get("/post");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /post/:postId", () => {
  it("should return a specific post", async () => {
    const res = await request(app).get(`/post/${postIds[0]}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(postIds[0]);
  });
});

const updatedFields = {
  title: "Updated Post Title",
  postBody: "Updated post content",
};

const updatedPost = {
  userId: "65713d71d097d31b78bbed53",
  user: "testuser",
  title: "Updated Post Title",
  postBody: "Updated post content",
  image: "http://example.com/test.jpg",
  likes: ["658fc60a860335bf918a3702"],
  dateCreated: "2023-12-30T06:00:00.000Z",
};

describe("PATCH /post/:postId", () => {
  it("should update a post", async () => {
    const res = await request(app)
      .patch(`/post/${postIds[0]}`)
      .send(updatedFields);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /post/:postId", () => {
  it("should show updated post", async () => {
    const res = await request(app).get(`/post/${postIds[0]}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedPost);
  });
});

describe("DELETE /post/:postId", () => {
  it("should delete a post", async () => {
    const res = await request(app).delete(`/post/${postIds[0]}`);
    expect(res.statusCode).toBe(204);
  });
});

describe("GET /post/", () => {
  it("deleted post should not exist anymore", async () => {
    const res = await request(app).get("/post");
    expect(res.statusCode).toBe(200);

    const isPostDeleted = postIds.every(
      (id) => !res.body.some((post: { _id: string }) => post._id === id)
    );

    expect(isPostDeleted).toBe(true);
  });
});
