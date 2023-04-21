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
    const todo = { title, description };
    const todoRecord = await TodoRepository.create(todo);
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
  })
  .put<{ id: string }, { todo: ITodo }, ITodo>(async (req, res) => {
    const { id } = req.params;
    const todoRecord = await TodoRepository.update(id, req.body);
    return res.status(200).json({ todo: todoRecord }).end();
  });
