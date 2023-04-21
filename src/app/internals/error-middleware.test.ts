import assert from "node:assert/strict";
import { describe, it } from "node:test";
import request from "supertest";
import Express from "express";
import { errorMiddleware } from "./error-middleware.js";

describe("error middleware", () => {
  it("should handle error", async () => {
    const app = Express();
    app.get("/", (_, __, next) => {
      next(new Error("Error"));
    });
    app.use(errorMiddleware);

    const response = await request(app).get("/").expect(500);

    assert.deepEqual(response.body, { message: "Internal server error" });
    assert.equal(response.status, 500);
  });
});
