import { it, describe, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";

import app from "../src/index";

let mongo: any;

beforeAll(async () => {
  console.error = vi.fn();
  console.log = vi.fn();
  console.warn = vi.fn();
  console.info = vi.fn();
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

// beforeEach(async () => {
//   const collections = await mongoose.connection.db?.collections();
//   if (!collections) return;
//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// });

describe("Test the register functionality", () => {
  beforeEach(async () => {
    const collections = await mongoose.connection.db?.collections();
    if (!collections) return;
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });

  // Arrange
  const endPoint = "/api/auth/register";
  const userPayload = {
    name: "Vivek",
    email: "vivek@gmail.com",
    password: "123456",
    confirmPassword: "123456",
    role: "JOB_SEEKER",
  };

  it("Should register a user", async () => {
    // Act
    const res = await request(app).post(endPoint).send(userPayload);

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: "User created successfully",
    });
  });

  it("return 400 with invalid email", async () => {
    // Act
    const res = await request(app).post(endPoint).send({
      name: "Vivek",
      email: "vivekgmail.com",
      password: "123456",
      confirmPassword: "123456",
      role: "JOB_SEEKER",
    });
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "Validation failed",
    });
  });

  it("returns a 400 with missing fields", async () => {
    return request(app).post(endPoint).send({}).expect(400);
  });
});

describe("Test the login functionality", () => {
  const endPoint = "/api/auth/login";
  const userPayload = {
    email: "vivek@gmail.com",
    password: "123456",
  };

  beforeAll(async () => {
    // Create user in in-memory DB before login test
    await request(app).post("/api/auth/register").send({
      name: "Vivek",
      email: "vivek@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      role: "JOB_SEEKER",
    });
  });

  it("Should login a user", async () => {
    const res = await request(app).post(endPoint).send(userPayload);
    expect(res.status).toBe(200);

    expect(res.headers["set-cookie"]).toBeDefined();

    const cookies = Array.isArray(res.headers["set-cookie"]) ? res.headers["set-cookie"] : [];
    const accessTokenCookie = cookies.find((cookie: string) => cookie.startsWith("access_token"));
    expect(accessTokenCookie).toBeDefined();
  });
});
