import assert from "node:assert/strict";
import { describe, it } from "node:test";
import request from "supertest";
import { makeApp } from "../app/app.js";

describe("[ROUTE] - health", () => {
  it("should handle GET /health", async () => {
    const app = makeApp();
    const response = await request(app).get("/health").expect(200);
    assert.deepEqual(response.body, { message: "Server up and running" });
  });
});
