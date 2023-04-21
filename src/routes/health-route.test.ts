import { describe, it } from "node:test";
import request from "supertest";
import { makeApp } from "../app/app.js";
import assert from "node:assert";

describe("[ROUTE] - health", () => {
  it("should handle GET /health", async () => {
    const app = makeApp();
    const response = await request(app).get("/health").expect(200);
    assert.deepEqual(response.body, { message: "Server up and running" });
  });
});
