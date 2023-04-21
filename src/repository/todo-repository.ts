import crypto from "node:crypto";

export interface ITodo {
  id: string;
  title: string;
  description: string;
}

export class TodoRepository {
  private static todos: Array<ITodo> = [];

  static find = async (id?: string) => {
    if (id) {
      return this.todos.filter((todo) => todo.id === id);
    }
    return this.todos;
  };

  static create = async (todo: Omit<ITodo, "id">) => {
    this.todos.push({ ...todo, id: crypto.randomUUID() });
    return this.todos[this.todos.length - 1]!;
  };

  static update = async (id: string, todo: ITodo) => {
    if (id !== todo.id) {
      throw new Error("Todo not found");
    }

    this.todos = this.todos.map((todoRecord) => {
      if (todoRecord.id !== id) {
        return todoRecord;
      }
      return todo;
    });

    return todo;
  };

  static reset = () => {
    this.todos.length = 0;
  };
}
