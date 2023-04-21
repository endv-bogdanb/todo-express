import { beforeEach, describe, it } from "node:test";
import request from "supertest";
import assert from "node:assert/strict";
import esmock from "esmock";
import { makeApp } from "../app/app.js";
import { TodoRepository } from "../repository/todo-repository.js";

describe("[ROUTE] - todo", () => {
  beforeEach(async () => {
    TodoRepository.reset();
  });

  it("should handle GET /todos", async () => {
    const app = (await import("../app/app.js")).makeApp();

    const todo1 = await TodoRepository.create({
      title: "Todo title",
      description: "Todo description",
    });
    const todo2 = await TodoRepository.create({
      title: "Todo title",
      description: "Todo description",
    });

    const response = await request(app).get("/todos").expect(200);
    assert.deepEqual(response.body, {
      todos: [todo1, todo2],
    });
  });

  it("should handle POST /todos", async () => {
    const app = (
      await esmock("../app/app.js", undefined, {
        "node:crypto": {
          randomUUID: () => "test-uuid-value",
        },
      })
    ).makeApp();

    const response = await request(app)
      .post("/todos")
      .send({ title: "Todo title", description: "Todo description" })
      .expect(200);

    assert.deepEqual(response.body, {
      todo: {
        id: "test-uuid-value",
        title: "Todo title",
        description: "Todo description",
      },
    });
  });

  it("should handle POST /todos/:id", async () => {
    const app = makeApp();

    const todo = await TodoRepository.create({
      title: "Todo title",
      description: "Todo description",
    });

    const response = await request(app).get(`/todos/${todo.id}`).expect(200);

    assert.deepEqual(response.body, { todo: todo });
  });

  it("should handle PUT /todos/:id", async () => {
    const app = makeApp();

    const todo = await TodoRepository.create({
      title: "Todo title",
      description: "Todo description",
    });

    const response = await request(app)
      .put(`/todos/${todo.id}`)
      .send({ ...todo, title: "Todo title modified" })
      .expect(200);

    assert.deepEqual(response.body, {
      todo: { ...todo, title: "Todo title modified" },
    });
  });
});
