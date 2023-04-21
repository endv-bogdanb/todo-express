import crypto from "node:crypto";
import { Router } from "./internals/router.js";
import { ITodo, TodoRepository } from "../repository/todo-repository.js";

export const router = Router();

router
  .route("/todos")
  .get<{}, { todos: ITodo[] }>(async (_, res) => {
    return res.status(200).json({ todos: await TodoRepository.find() });
  })
  .post<{}, { todo: ITodo }, Omit<ITodo, "id">>(async (req, res) => {
    const { title, description } = req.body;
    const todoRecord = { id: crypto.randomUUID(), title, description };
    await TodoRepository.create(todoRecord);
    return res.status(200).json({ todo: todoRecord }).end();
  });

router
  .route("/todos/:id")
  .get<{ id: string }, { todo: ITodo }>(async (req, res) => {
    const { id } = req.params;

    const [todoRecord] = await TodoRepository.find(id);

    if (!todoRecord) {
      throw new Error("Todo not found");
    }

    return res.status(200).json({ todo: todoRecord });
  });
