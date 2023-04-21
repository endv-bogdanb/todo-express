import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { makeApp } from "./app.js";

describe("app", () => {
  it("should be defined", () => {
    const app = makeApp();
    assert.ok(!!app);
    assert.ok("listen" in app);
  });
});
